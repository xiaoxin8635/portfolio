/**
 * @file 网站内容配置（唯一数据源）
 *
 * 站点所有文案集中在此文件，修改后 git push 即自动更新线上站点。
 * 使用说明：
 * 1. 把标注 TODO 的字段替换成你的真实信息
 * 2. projects / skillGroups / timeline 中的示例条目可自由增删
 */

/** 站点主人基础信息（导航栏 / 首屏 / 页脚共用） */
export const profile = {
  /** 显示姓名 */
  name: '陈琦勇',
  /** 英文名（可选，暂未在页面使用，留作扩展） */
  nameEn: 'Chen Qiyong',
  /** 职位定位（首屏首行引导） */
  role: '全栈开发者 / Full-Stack Developer',
  /** 一句话主张（首屏正文段落） */
  tagline: '把想法做成能运行的产品。这个网站的界面由右侧这份配置驱动 —— 改完推送，一两分钟内自动上线。',
  /** 所在地 */
  location: 'China',
  /** 联系邮箱（联系板块展示） */
  email: 'coderchen003@163.com',
  /** GitHub 主页（导航 / 首屏 / 联系板块的跳转链接） */
  github: 'https://github.com/xiaoxin8635',
}

/**
 * 关于我板块的介绍段落（每项渲染为一个段落）
 * TODO: 替换为你的真实介绍
 * @type {string[]}
 */
export const aboutText = [
  '你好，我是陈琦勇，一名全栈开发者。专注于 Web 应用的设计与实现，从界面交互到服务端接口都有实践经验。',
  '我喜欢简洁可维护的代码和顺手的工程化流程 —— 这个网站本身就是一次实践：代码托管在 GitHub，由 Cloudflare 在每次 push 后自动构建并部署到全球 CDN。',
]

/**
 * 手工固定的项目条目（Projects 板块置顶展示）
 * 其余仓库由 src/data/github.js 运行时从 GitHub 动态拉取，无需在此维护
 * @type {Array<{title: string, description: string, tech: string[], github?: string, demo?: string}>}
 */
export const projects = [
  {
    title: '个人作品集网站（本站）',
    description:
      '基于 Vue 3 + Vite 构建的响应式单页作品集，托管于 Cloudflare。git push 后 1~2 分钟内自动构建上线，全球 CDN 加速。',
    tech: ['Vue 3', 'Vite', 'Cloudflare'],
    /** GitHub 仓库链接（不填则不显示该入口） */
    github: 'https://github.com/xiaoxin8635/portfolio',
    /** 在线演示链接（可选，不填则不显示该入口） */
    demo: '',
  },
]

/**
 * 手工维护的技能分组（Skills 板块下半部分；上半部分为 GitHub 语言分布自动统计）
 * TODO: 按真实掌握情况增删条目 —— 保持真实，不要罗列未使用过的技术
 * @type {Array<{name: string, items: string[]}>}
 */
export const skillGroups = [
  { name: '工程与工具', items: ['Git', 'GitHub Actions', 'Cloudflare Pages', 'Vite'] },
]

/**
 * 个人经历时间线（About 板块，按时间倒序排列；为空数组时该板块自动隐藏）
 * TODO: 需要展示时按此格式添加条目
 * @type {Array<{period: string, title: string, description: string}>}
 */
export const timeline = []

/** 页脚左侧的备注文案 */
export const footerNote = '用 Vue 构建 · 托管于 Cloudflare'
