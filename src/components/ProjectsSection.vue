<!--
  @file 项目展示板块 —— 卡片网格，数据来自 profile.js 的 projects
-->
<script setup>
/**
 * 项目板块：每张卡片含编号、标题、简介、技术栈与 GitHub/Demo 链接
 */
import { projects } from '../data/profile'
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <p v-reveal class="section-label">// PROJECTS</p>
      <h2 v-reveal="{ delay: 60 }" class="section-title">项目展示</h2>

      <div class="grid">
        <article
          v-for="(p, i) in projects"
          :key="p.index"
          v-reveal="{ delay: i * 80 }"
          class="card project"
        >
          <div class="project-top">
            <span class="index">{{ p.index }}</span>
            <span class="project-links">
              <a
                v-if="p.demo"
                :href="p.demo"
                target="_blank"
                rel="noopener"
                aria-label="在线演示"
              >
                Demo ↗
              </a>
              <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noopener"
                aria-label="GitHub 仓库"
              >
                GitHub ↗
              </a>
            </span>
          </div>

          <h3 class="project-title">{{ p.title }}</h3>
          <p class="desc">{{ p.description }}</p>

          <ul class="tech">
            <li v-for="t in p.tech" :key="t" class="chip">{{ t }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 自适应网格：窄屏单列，宽屏最多三列 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.project {
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 编号：mono 字体 + 渐变色 */
.index {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.9rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.project-links {
  display: flex;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-faint);
}

.project-links a {
  transition: color 0.2s ease;
}

.project-links a:hover {
  color: var(--accent);
}

.project-title {
  font-size: 1.15rem;
}

/* 简介占满剩余空间，保证多卡片高度一致时技术标签贴底 */
.desc {
  color: var(--text-dim);
  font-size: 0.92rem;
  flex: 1;
}

.tech {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
