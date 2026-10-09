<!--
  @file 技术栈 —— 上半：GitHub 仓库真实语言分布统计；下半：手工维护的工程技能分组
-->
<script setup>
/**
 * 技能板块
 * - langStats：由 github.js 聚合各仓库 languages 接口得到（真实字节占比，缓存 → 实时 → 快照兜底）
 * - skillGroups：来自 profile.js，手工维护（保持真实，勿填未掌握项）
 */
import { onMounted, ref } from 'vue'
import { skillGroups } from '../data/profile'
import { getGithubData } from '../data/github'

/** 语言分布统计（名称 + 字节占比） */
const langStats = ref([])

onMounted(async () => {
  const data = await getGithubData()
  langStats.value = data.langStats
})
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">技术栈</h2>
        <p class="section-meta">语言分布统计自 GitHub 公开仓库</p>
      </div>

      <!-- 语言分布：细条形统计 -->
      <div class="lang-chart">
        <div v-for="l in langStats" :key="l.name" class="lang-row">
          <span class="lang-name">{{ l.name }}</span>
          <span class="lang-bar" aria-hidden="true">
            <i class="lang-fill" :style="{ width: l.percent + '%' }" />
          </span>
          <span class="lang-percent">{{ l.percent }}%</span>
        </div>
      </div>

      <!-- 手工分组 -->
      <div class="skill-grid">
        <div v-for="g in skillGroups" :key="g.name" class="skill-group">
          <h3 class="skill-name">{{ g.name }}</h3>
          <ul class="skill-items">
            <li v-for="item in g.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 语言统计行：名称 / 条形 / 百分比 三段对齐 */
.lang-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 56px;
}

.lang-row {
  display: grid;
  grid-template-columns: 92px 1fr 48px;
  align-items: center;
  gap: 16px;
}

.lang-name {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text);
}

/* 细条：4px 高，弱底色 + 钢蓝填充（无渐变） */
.lang-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.lang-fill {
  display: block;
  height: 100%;
  background: var(--steel);
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.lang-percent {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  text-align: right;
}

/* 分组：双栏排布 */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 64px;
}

.skill-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  padding-bottom: 14px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

/* 条目：mono 流式行内排布，仅以间距分组，无胶囊无边框 */
.skill-items {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--muted);
}

@media (max-width: 640px) {
  .skill-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
