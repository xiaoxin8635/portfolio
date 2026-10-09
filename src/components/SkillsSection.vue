<!--
  @file 技术栈 —— 紧凑分组清单：组名 + 流式 mono 条目，无卡片
-->
<script setup>
/**
 * 技能清单组件：数据来自 profile.js 的 skillGroups 数组
 */
import { skillGroups } from '../data/profile'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">技术栈</h2>
        <p class="section-meta">以日常使用为准</p>
      </div>

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
/* 双栏分组排布；第三组自然落位 */
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
