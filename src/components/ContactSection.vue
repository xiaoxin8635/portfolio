<!--
  @file 联系 —— 一行超大字邮箱作为主体，左对齐编辑式排版
-->
<script setup>
/**
 * 联系组件：邮箱与 GitHub 入口，数据来自 profile.js
 */
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">联系</h2>
        <p class="section-meta">项目合作 / 技术交流</p>
      </div>

      <div class="contact-body">
        <a class="contact-mail link-u" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <p class="contact-sub">
          也可以在
          <a class="link-u" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
          上找到我。
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 超大字邮箱：display 字体，下划线交互，行高防中文系统字体裁切 */
.contact-mail {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4.6vw, 3rem);
  font-weight: 700;
  line-height: 1.4;
  word-break: break-all;
}

.contact-sub {
  margin-top: 22px;
  color: var(--muted);
  font-size: 0.95rem;
}
</style>
