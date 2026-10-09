<!--
  @file 关于板块 —— 左侧个人介绍 + 右侧经历时间线
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
      <p v-reveal class="section-label">// ABOUT</p>
      <h2 v-reveal="{ delay: 60 }" class="section-title">关于我</h2>

      <div class="about-grid">
        <!-- 左：介绍段落 -->
        <div v-reveal class="intro card">
          <p v-for="(para, i) in aboutText" :key="i">{{ para }}</p>
        </div>

        <!-- 右：经历时间线 -->
        <ol class="timeline">
          <li v-for="(item, i) in timeline" :key="i" v-reveal="{ delay: i * 100 }" class="tl-item">
            <span class="tl-dot" aria-hidden="true" />
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
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  margin-top: 40px;
}

.intro {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.intro p {
  color: var(--text-dim);
  font-size: 0.95rem;
}

/* 时间线：左侧竖线 + 每项一个渐变圆点 */
.timeline {
  list-style: none;
  position: relative;
  padding-left: 26px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* 竖线 */
.timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--border);
}

.tl-item {
  position: relative;
}

/* 圆点对齐竖线 */
.tl-dot {
  position: absolute;
  left: -26px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gradient);
  box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.12);
}

.tl-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.08em;
}

.tl-title {
  font-size: 1rem;
  margin-top: 4px;
}

.tl-desc {
  color: var(--text-dim);
  font-size: 0.9rem;
  margin-top: 4px;
}

/* 窄屏切换为单列 */
@media (max-width: 780px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
