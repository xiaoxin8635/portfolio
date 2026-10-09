<!--
  @file 首屏 —— 全站唯一记忆点：左侧主张文案，右侧展示真实的 profile.js 代码窗口
  设计原则：入场动画仅此一次编排（.enter）；代码窗口为静态真实内容，非装饰
-->
<script setup>
/**
 * 首屏组件：标题、主张与代码窗口
 * 代码窗口内容为 src/data/profile.js 的真实片段（手工高亮），与站点数据源保持语义一致
 */
import { profile } from '../data/profile'
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero-grid">
      <!-- 左列：标题与主张 -->
      <div class="intro">
        <p class="enter kicker" style="--enter-delay: 0s">
          {{ profile.role }}
        </p>
        <h1 class="enter name" style="--enter-delay: 0.08s">
          {{ profile.name }}<span class="dot">。</span>
        </h1>
        <p class="enter claim" style="--enter-delay: 0.16s">
          {{ profile.tagline }}
        </p>
        <div class="enter actions" style="--enter-delay: 0.24s">
          <a class="btn btn-primary" href="#projects">看项目</a>
          <a class="btn btn-ghost" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>

      <!-- 右列：真实代码窗口（唯一记忆点） -->
      <div class="enter window" style="--enter-delay: 0.2s" aria-label="profile.js 代码预览">
        <div class="window-bar">
          <span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="window-file">src/data/profile.js</span>
        </div>
        <pre class="window-code"><code><span class="tok-kw">export const</span> <span class="tok-var">profile</span> = {
  name: <span class="tok-str">'陈琦勇'</span>,
  role: <span class="tok-str">'全栈开发者'</span>,
  stack: [<span class="tok-str">'Vue 3'</span>, <span class="tok-str">'Node.js'</span>, <span class="tok-str">'Cloudflare'</span>],
}

<span class="tok-cmt">// 网站内容都写在这份文件里，</span>
<span class="tok-cmt">// git push 后由 Cloudflare 自动构建上线</span>
<span class="tok-kw">export const</span> <span class="tok-var">deploy</span> = {
  trigger: <span class="tok-str">'git push'</span>,
  cdn: <span class="tok-str">'global'</span>,
}</code></pre>
        <div class="window-status">
          <span>main</span>
          <span>push → build → deploy ✓</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 首屏铺满一屏，内容垂直居中 */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 64px;
}

/* 左文右窗：1.05 : 0.95 非对称 */
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 72px;
  align-items: center;
  width: 100%;
}

/* 职位一行：mono 小字，作为标题的引导而非装饰标签 */
.kicker {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--steel);
  margin-bottom: 18px;
}

/* 姓名：display 字体大号，全角句号做视觉锚点 */
.name {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6.5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: 0.01em;
}

.name .dot {
  color: var(--accent);
}

/* 主张文案：限宽保证可读行长 */
.claim {
  margin-top: 26px;
  max-width: 34em;
  color: var(--muted);
  font-size: 1.02rem;
}

.actions {
  margin-top: 38px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* ---------- 代码窗口 ---------- */
.window {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--font-mono);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.window-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}

.window-dots {
  display: inline-flex;
  gap: 6px;
}

.window-dots i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #33373f;
}

/* 文件路径用弱化暖灰，不抢代码内容 */
.window-file {
  font-size: 0.78rem;
  color: var(--faint);
}

.window-code {
  padding: 22px 20px;
  font-size: 0.84rem;
  line-height: 1.85;
  overflow-x: auto;
}

/* 语法高亮：金=关键字、钢蓝=字符串、暖灰=注释（与全站 token 同源） */
.tok-kw {
  color: var(--accent);
}
.tok-var {
  color: var(--text);
}
.tok-str {
  color: var(--steel);
}
.tok-cmt {
  color: var(--faint);
}

/* 底部状态栏：语义性实时信息 */
.window-status {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 16px;
  border-top: 1px solid var(--border);
  font-size: 0.74rem;
  color: var(--faint);
}

/* ---------- 响应式 ---------- */
@media (max-width: 920px) {
  .hero {
    min-height: auto;
    padding: 140px 0 72px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .window {
    max-width: 560px;
  }
}
</style>
