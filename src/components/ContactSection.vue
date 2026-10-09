<!--
  @file 联系板块 —— 居中 CTA：邮箱 + GitHub 入口
-->
<script setup>
/**
 * 联系板块：邮箱与 GitHub 链接来自 profile
 */
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="section">
    <div v-reveal class="container contact">
      <p class="section-label">// CONTACT</p>
      <h2 class="section-title">让我们一起创造点什么</h2>
      <p class="sub">无论是项目合作、技术交流还是机会引荐，都欢迎随时联系我。</p>

      <div class="actions">
        <a :href="`mailto:${profile.email}`" class="btn btn-primary">{{ profile.email }}</a>
        <a :href="profile.github" target="_blank" rel="noopener" class="btn btn-ghost">
          GitHub ↗
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  text-align: center;
}

.sub {
  color: var(--text-dim);
  margin-top: 14px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 32px;
}
</style>
