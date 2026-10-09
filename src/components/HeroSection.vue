<!--
  @file 首屏 Hero —— 姓名、定位、技能标签、CTA 按钮，纯 CSS 光晕与网格背景
-->
<script setup>
/**
 * 首屏组件：所有文案来自 profile.js，无本地状态
 */
import { profile } from '../data/profile'
</script>

<template>
  <section id="top" class="hero">
    <!-- 装饰层：局部光斑 + 网格纹理（纯 CSS，不参与布局，屏幕阅读器忽略） -->
    <div class="hero-bg" aria-hidden="true">
      <div class="glow glow-cyan" />
      <div class="glow glow-violet" />
      <div class="grid" />
    </div>

    <div class="container hero-inner">
      <p v-reveal class="hello">// HELLO WORLD, I'M</p>
      <h1 v-reveal="{ delay: 80 }" class="name">
        {{ profile.name }}<span class="dot">.</span>
      </h1>
      <p v-reveal="{ delay: 160 }" class="role">{{ profile.role }}</p>
      <p v-reveal="{ delay: 240 }" class="tagline">{{ profile.tagline }}</p>

      <ul v-reveal="{ delay: 320 }" class="tags">
        <li v-for="tag in profile.heroTags" :key="tag" class="chip">{{ tag }}</li>
      </ul>

      <div v-reveal="{ delay: 400 }" class="actions">
        <a href="#projects" class="btn btn-primary">查看项目 →</a>
        <a :href="profile.github" target="_blank" rel="noopener" class="btn btn-ghost">GitHub</a>
      </div>
    </div>

    <!-- 底部滚动提示：小鼠标造型 + 滚轮下落动画 -->
    <a href="#projects" class="scroll-hint" aria-label="向下滚动查看项目">
      <span class="mouse"><span class="wheel" /></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero-inner {
  position: relative;
}

/* ---- 背景装饰 ---- */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
}

.glow-cyan {
  width: 420px;
  height: 420px;
  top: -80px;
  left: -120px;
  background: rgba(34, 211, 238, 0.16);
  animation: drift 14s ease-in-out infinite alternate;
}

.glow-violet {
  width: 480px;
  height: 480px;
  bottom: -120px;
  right: -140px;
  background: rgba(167, 139, 250, 0.15);
  animation: drift 18s ease-in-out infinite alternate-reverse;
}

/* 光斑缓慢漂移动画 */
@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(50px, 30px) scale(1.08);
  }
}

/* 网格纹理：用径向遮罩向边缘淡出 */
.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
}

/* ---- 文字内容 ---- */
.hello {
  font-family: var(--font-mono);
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 14px;
}

.name {
  font-size: clamp(2.6rem, 7vw, 4.4rem);
  font-weight: 800;
  line-height: 1.15;
}

.name .dot {
  color: var(--accent);
}

.role {
  font-size: clamp(1.1rem, 2.4vw, 1.45rem);
  font-weight: 600;
  margin-top: 10px;
}

.tagline {
  color: var(--text-dim);
  margin-top: 14px;
  max-width: 560px;
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}

/* ---- 滚动提示 ---- */
.scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
}

.mouse {
  display: block;
  width: 24px;
  height: 38px;
  border: 2px solid var(--text-faint);
  border-radius: 14px;
  position: relative;
}

.wheel {
  position: absolute;
  top: 7px;
  left: 50%;
  width: 3px;
  height: 7px;
  margin-left: -1.5px;
  border-radius: 2px;
  background: var(--accent);
  animation: wheel 1.6s ease infinite;
}

@keyframes wheel {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 0;
  }
}

@media (max-width: 720px) {
  .scroll-hint {
    display: none;
  }
}
</style>
