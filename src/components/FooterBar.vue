<!--
  @file 页脚 —— 版权信息与托管平台标注
-->
<script setup>
/**
 * 页脚组件：年份动态生成，避免过期
 */
import { profile, footerNote } from '../data/profile'

/** 当前年份（页脚版权用） */
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="copy">© {{ year }} {{ profile.name }} · {{ footerNote }}</p>
      <p class="powered">
        Deployed on
        <a href="https://workers.cloudflare.com" target="_blank" rel="noopener">Cloudflare</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 28px 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-faint);
}

.powered a {
  color: var(--text-dim);
  transition: color 0.2s ease;
}

.powered a:hover {
  color: var(--accent);
}

@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
