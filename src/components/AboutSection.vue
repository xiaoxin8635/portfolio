<!--
  @file 关于板块 —— 左侧个人介绍（纯排版）+ 右侧经历时间线（内容真为序列，保留时间线形式）
-->
<script setup>
/**
 * 关于板块：介绍段落来自 aboutText，经历来自 timeline
 */
import { aboutText, timeline } from '../data/profile'
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">关于我</h2>
        <p v-if="timeline.length" class="section-meta">经历与偏好</p>
      </div>

      <div class="about-grid" :class="{ single: !timeline.length }">
        <!-- 左：介绍段落 -->
        <div class="intro">
          <p v-for="(para, i) in aboutText" :key="i">{{ para }}</p>
        </div>

        <!-- 右：经历时间线（timeline 为空时整列隐藏） -->
        <ol v-if="timeline.length" class="timeline">
          <li v-for="(item, i) in timeline" :key="i" class="tl-item">
            <p class="tl-period">{{ item.period }}</p>
            <h4 class="tl-title">{{ item.title }}</h4>
            <p class="tl-desc">{{ item.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
}

/* 无时间线时单列，限制介绍文本行长保证可读性 */
.about-grid.single {
  grid-template-columns: 1fr;
}

.about-grid.single .intro {
  max-width: 46em;
}

/* 介绍：纯文本排版，无卡片容器 */
.intro {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--muted);
  font-size: 0.96rem;
}

/* 时间线：项间细分割线替代竖线装饰 */
.timeline {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.tl-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
}

.tl-item:first-child {
  padding-top: 0;
}

/* 年份：mono + 钢蓝（次级信息用钢蓝的 token 分工） */
.tl-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--steel);
}

.tl-title {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 700;
  margin-top: 6px;
}

.tl-desc {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 6px;
}

/* 窄屏切换为单列 */
@media (max-width: 780px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
