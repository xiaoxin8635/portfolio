<!--
  @file 技能板块 —— 分组卡片展示技术栈，数据来自 profile.js 的 skillGroups
-->
<script setup>
/**
 * 技能板块：每组一张卡片，组内以 chip 列出具体技术
 */
import { skillGroups } from '../data/profile'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <p v-reveal class="section-label">// SKILLS</p>
      <h2 v-reveal="{ delay: 60 }" class="section-title">技术栈</h2>

      <div class="grid">
        <div
          v-for="(g, i) in skillGroups"
          :key="g.name"
          v-reveal="{ delay: i * 80 }"
          class="card group"
        >
          <h3 class="group-name">
            <span class="dot" aria-hidden="true" />
            {{ g.name }}
          </h3>
          <ul class="items">
            <li v-for="item in g.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.group {
  padding: 26px;
}

.group-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  margin-bottom: 18px;
}

/* 组名前的渐变小圆点 */
.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gradient);
  flex-shrink: 0;
}

.items {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
