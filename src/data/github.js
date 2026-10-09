/**
 * @file GitHub 动态数据模块 —— 运行时拉取公开仓库列表与语言分布，供项目区/技能区渲染
 *
 * 数据策略（三层保障）：
 * 1. localStorage 缓存（1 小时 TTL）：命中则直接使用，节省 API 配额（未认证 60 次/小时/IP）
 * 2. 实时请求 GitHub API：列表接口 + 各仓库 languages 接口（仅前 6 个仓库，控制请求数）
 * 3. 内嵌快照兜底：请求失败或超时（国内网络波动）时，使用下方 SNAPSHOT 中的真实数据
 */

/** GitHub 用户名（与 profile.js 的 github 字段保持一致） */
export const GITHUB_USER = 'xiaoxin8635'

/** 展示的仓库数量上限 */
export const MAX_REPOS = 6

/** 参与语言统计的仓库数量上限（限制 languages 接口请求数） */
const MAX_LANG_REPOS = 6

/** 缓存键与有效期（毫秒） */
const CACHE_KEY = 'github-cache-v1'
const CACHE_TTL = 60 * 60 * 1000

/**
 * 内嵌快照（2026-10-09 由 GitHub API 生成）
 * 注意：Flow-Forge 为主语言为空的混合仓库，语言分布来自其 languages 接口
 */
const SNAPSHOT = {
  repos: [
    {
      name: 'Flow-Forge',
      description:
        '面向高并发文生图 / 文生视频场景的开源 API 模型网关：Go + Python 双层架构，统一任务式 API，内置鉴权、限流、配额、渠道路由与任务编排。',
      language: 'Go + Python',
      stars: 0,
      url: `https://github.com/xiaoxin8635/Flow-Forge`,
      updatedAt: '2026-08-23',
    },
    {
      name: 'ai-long-session-workbench',
      description: '',
      language: 'Python',
      stars: 0,
      url: `https://github.com/xiaoxin8635/ai-long-session-workbench`,
      updatedAt: '2026-09-23',
    },
  ],
  langStats: [
    { name: 'Go', percent: 47 },
    { name: 'Python', percent: 42 },
    { name: 'Vue', percent: 11 },
  ],
}

/**
 * 将原始仓库对象归一化为站点使用的结构
 * @param {object} r GitHub API 返回的仓库对象
 * @returns {{name: string, description: string, language: string|null, stars: number, url: string, updatedAt: string, languagesUrl: string}}
 */
function normalizeRepo(r) {
  return {
    name: r.name,
    description: r.description || '',
    language: r.language || null,
    stars: r.stargazers_count || 0,
    url: r.html_url,
    updatedAt: (r.updated_at || '').slice(0, 10),
    languagesUrl: r.languages_url,
  }
}

/**
 * 读取本地缓存（未过期时命中）
 * @returns {{repos: object[], langStats: {name: string, percent: number}[]}|null}
 */
function readCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (raw && Date.now() - raw.time < CACHE_TTL) return raw.data
  } catch {
    /* 缓存损坏时静默忽略，走实时请求 */
  }
  return null
}

/**
 * 写入本地缓存
 * @param {{repos: object[], langStats: {name: string, percent: number}[]}} data 归一化后的数据
 */
function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data }))
  } catch {
    /* 隐私模式等场景写入失败可忽略 */
  }
}

/**
 * 拉取全部公开仓库（仅排除 fork）
 * @returns {Promise<object[]>} 归一化后的仓库数组（按 star 与更新时间降序）
 */
async function fetchAllRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
  )
  if (!res.ok) throw new Error(`repos ${res.status}`)
  const list = await res.json()
  return list
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || (a.updated_at < b.updated_at ? 1 : -1))
    .map(normalizeRepo)
}

/**
 * 并发拉取各仓库语言分布，聚合成全局语言占比
 * @param {object[]} repos 归一化仓库数组（取前 MAX_LANG_REPOS 个统计）
 * @returns {Promise<{name: string, percent: number}[]>} 按占比降序的语言统计
 */
async function fetchLangStats(repos) {
  const targets = repos.slice(0, MAX_LANG_REPOS)
  const results = await Promise.all(
    targets.map(async (r) => {
      try {
        const res = await fetch(r.languagesUrl)
        if (!res.ok) return null
        return res.json()
      } catch {
        return null
      }
    })
  )

  /** 各语言字节总量 */
  const totals = {}
  for (const langs of results) {
    if (!langs) continue
    for (const [lang, bytes] of Object.entries(langs)) totals[lang] = (totals[lang] || 0) + bytes
  }

  const sum = Object.values(totals).reduce((a, b) => a + b, 0)
  if (!sum) return []
  return Object.entries(totals)
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / sum) * 100) }))
    .filter((l) => l.percent >= 1)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 6)
}

/**
 * 获取 GitHub 动态数据（缓存 → 实时 → 快照兜底）
 * @returns {Promise<{repos: object[], langStats: {name: string, percent: number}[], live: boolean}>}
 *   live 标识数据是否来自实时接口（false 表示使用了快照/缓存不可用时）
 */
export async function getGithubData() {
  const cached = readCache()
  if (cached) return { ...cached, live: true }

  try {
    const all = await withTimeout(fetchAllRepos(), 6000)
    // 语言统计基于全部仓库（含 portfolio 本站，它也是真实项目）；项目列表则排除本站条目
    const langStats = await withTimeout(fetchLangStats(all), 6000)
    const repos = all.filter((r) => r.name !== 'portfolio').slice(0, MAX_REPOS)
    const data = { repos, langStats }
    writeCache(data)
    return { ...data, live: true }
  } catch {
    return { ...SNAPSHOT, live: false }
  }
}

/**
 * 为 fetch 附加超时限制（Promise 竞速）
 * @param {Promise} p 目标 Promise
 * @param {number} ms 超时毫秒数
 */
function withTimeout(p, ms) {
  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))])
}
