<!--
  @file 项目展示 —— 行式列表：固定「本站」条目 + 运行时从 GitHub 拉取的真实仓库
-->
<script setup>
/**
 * 项目列表组件
 * - pinned：来自 profile.js（当前仅本站条目，手工维护）
 * - repos：来自 github.js 动态拉取（缓存 → 实时 API → 快照兜底，调用方无需感知降级）
 */
import { onMounted, ref } from 'vue'
import { projects as pinned } from '../data/profile'
import { getGithubData } from '../data/github'

/** 动态仓库列表（拉取完成后渲染） */
const repos = ref([])

onMounted(async () => {
  const data = await getGithubData()
  repos.value = data.repos
})
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">精选项目</h2>
        <p class="section-meta">同步自 GitHub 公开仓库</p>
      </div>

      <ul class="project-list">
        <!-- 手工固定条目（本站） -->
        <li v-for="p in pinned" :key="p.title" class="project-row">
          <div class="project-main">
            <h3 class="project-title">{{ p.title }}</h3>
            <p class="project-desc">{{ p.description }}</p>
            <p class="project-stack">
              <span v-for="t in p.tech" :key="t">{{ t }}</span>
            </p>
          </div>
          <div class="project-links">
            <a v-if="p.demo" class="link-u" :href="p.demo" target="_blank" rel="noopener">访问</a>
            <a v-if="p.github" class="link-u" :href="p.github" target="_blank" rel="noopener">源码</a>
          </div>
        </li>

        <!-- 动态仓库条目 -->
        <li v-for="r in repos" :key="r.name" class="project-row">
          <div class="project-main">
            <h3 class="project-title">{{ r.name }}</h3>
            <p v-if="r.description" class="project-desc">{{ r.description }}</p>
            <p class="project-stack">
              <span v-if="r.language">{{ r.language }}</span>
              <span v-if="r.stars > 0">★ {{ r.stars }}</span>
              <span>{{ r.updatedAt }}</span>
            </p>
          </div>
          <div class="project-links">
            <a class="link-u" :href="r.url" target="_blank" rel="noopener">源码</a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* 行式列表：行间细分割线，无卡片无阴影 */
.project-list {
  list-style: none;
  border-top: 1px solid var(--border);
}

.project-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: start;
  padding: 30px 4px;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s ease;
}

/* hover 整行微亮，标题转金：克制的行级反馈 */
.project-row:hover {
  background: var(--surface);
}

.project-row:hover .project-title {
  color: var(--accent);
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  transition: color 0.2s ease;
}

.project-desc {
  margin-top: 10px;
  max-width: 46em;
  color: var(--muted);
  font-size: 0.95rem;
  /* 长描述（README 式原文）限 3 行，尾部省略 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 元信息：mono 流式小字（钢蓝），以斜杠分隔，无胶囊 */
.project-stack {
  margin-top: 14px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--steel);
}

.project-stack span + span::before {
  content: '/';
  margin: 0 10px;
  color: var(--faint);
}

/* 链接右对齐，顶部与标题基线对齐 */
.project-links {
  display: flex;
  gap: 20px;
  align-items: baseline;
  padding-top: 4px;
  font-size: 0.9rem;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .project-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .project-links {
    padding-top: 0;
  }
}
</style>
