<!--
  @file 项目展示 —— 双列卡片网格：固定「本站」条目 + 运行时从 GitHub 拉取的真实仓库
-->
<script setup>
/**
 * 项目列表组件
 * - pinned：来自 profile.js（当前仅本站条目，手工维护）
 * - repos：来自 github.js 动态拉取（缓存 → 实时 API → 快照兜底，调用方无需感知降级）
 * - 图标来自 langMeta.js（自托管 SVG，未收录语言按首字母渲染字符块兜底）
 */
import { onMounted, ref } from 'vue'
import { projects as pinned } from '../data/profile'
import { getGithubData } from '../data/github'
import { langIcon } from '../data/langMeta'

/** 动态仓库列表（拉取完成后渲染） */
const repos = ref([])

onMounted(async () => {
  const data = await getGithubData()
  repos.value = data.repos
})

/**
 * 取语言名首字母作为无图标时的字符块内容（如 Go → G）
 * @param {string} name 语言名
 * @returns {string} 大写首字母
 */
function langGlyph(name) {
  return (name || '?').charAt(0).toUpperCase()
}
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">精选项目</h2>
        <p class="section-meta">同步自 GitHub 公开仓库</p>
      </div>

      <div class="project-grid">
        <!-- 手工固定条目（本站），置顶标识 -->
        <article v-for="p in pinned" :key="p.title" class="project-card is-pinned">
          <header class="card-top">
            <span class="card-lang">
              <img v-if="langIcon(p.tech[0])" class="card-icon" :src="langIcon(p.tech[0])" alt="" aria-hidden="true" />
              <i class="card-lang-name">{{ p.tech[0] }}</i>
            </span>
            <span class="card-flag">置顶</span>
          </header>

          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-desc">{{ p.description }}</p>

          <footer class="card-foot">
            <span class="card-meta">
              <span v-for="t in p.tech" :key="t">{{ t }}</span>
            </span>
            <span class="card-links">
              <a v-if="p.demo" class="link-u" :href="p.demo" target="_blank" rel="noopener">访问</a>
              <a v-if="p.github" class="link-u" :href="p.github" target="_blank" rel="noopener">源码</a>
            </span>
          </footer>
        </article>

        <!-- 动态仓库条目 -->
        <article v-for="r in repos" :key="r.name" class="project-card">
          <header class="card-top">
            <span class="card-lang">
              <img v-if="langIcon(r.language)" class="card-icon" :src="langIcon(r.language)" alt="" aria-hidden="true" />
              <span v-else class="card-glyph" aria-hidden="true">{{ langGlyph(r.language) }}</span>
              <i class="card-lang-name">{{ r.language || '仓库' }}</i>
            </span>
            <span class="card-time">{{ r.updatedAt }}</span>
          </header>

          <h3 class="card-title">{{ r.name }}</h3>
          <p v-if="r.description" class="card-desc">{{ r.description }}</p>

          <footer class="card-foot">
            <span class="card-meta">
              <span v-if="r.stars > 0">★ {{ r.stars }}</span>
              <span v-if="r.language">{{ r.language }}</span>
            </span>
            <span class="card-links">
              <a class="link-u" :href="r.url" target="_blank" rel="noopener">源码</a>
            </span>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 双列网格：窄屏折单列 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* 卡片：白底细边框；内容纵向排布，footer 推底对齐 */
.project-card {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* hover：边框转金 + 极轻投影 + 标题转金（克制的行级反馈，不做位移） */
.project-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 6px 20px rgba(29, 30, 34, 0.06);
}

.project-card:hover .card-title {
  color: var(--accent);
}

/* 置顶卡片：边框略深以示区分 */
.project-card.is-pinned {
  border-color: var(--border-strong);
}

/* 顶行：图标 + 语言名（左）与时间/置顶（右）基线对齐 */
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.card-lang {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

/* 彩色技术图标：22px 小尺寸，作为信息而非装饰 */
.card-icon {
  width: 22px;
  height: 22px;
  flex: none;
}

/* 无图标兜底：首字母 mono 字符块 */
.card-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: 5px;
  background: var(--accent-dim);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}

.card-lang-name {
  font-style: normal;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--steel);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-time {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--faint);
  white-space: nowrap;
}

/* 置顶标记：金色 mono 小字 */
.card-flag {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--accent);
}

/* 标题与描述 */
.card-title {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.2s ease;
  word-break: break-all;
}

.card-desc {
  margin-top: 10px;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 0.9rem;
  /* 长描述（README 式原文）限 3 行，尾部省略 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 底部：细线上方分隔，meta 与链接分居两端；margin-top:auto 推底保证等高卡片对齐 */
.card-foot {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

/* meta：mono 斜杠流式小字（延续全站元信息风格） */
.card-meta {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--steel);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta span + span::before {
  content: '/';
  margin: 0 8px;
  color: var(--faint);
}

.card-links {
  display: flex;
  gap: 16px;
  align-items: baseline;
  font-size: 0.88rem;
  white-space: nowrap;
}

@media (max-width: 720px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
