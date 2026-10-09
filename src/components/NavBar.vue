<!--
  @file 顶部固定导航 —— 顶部透明，滚动后收纳为实色细条，移动端汉堡菜单
-->
<script setup>
/**
 * 导航栏组件
 * - 监听页面滚动，超过 24px 时切换 .scrolled 状态（背景变实色、高度收纳为细条）
 * - 移动端通过汉堡按钮开合菜单
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { profile } from '../data/profile'

/** 是否已滚动（控制导航收纳状态） */
const scrolled = ref(false)
/** 移动端菜单开合状态 */
const menuOpen = ref(false)

/** 锚点导航项 */
const links = [
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
]

/** 页面滚动回调：更新 scrolled 状态 */
function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/** 点击移动端菜单项后收起菜单 */
function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="container nav-inner">
      <a href="#top" class="logo" @click="closeMenu">
        <span class="logo-mark">&lt;/&gt;</span>
        <span class="logo-name">{{ profile.name }}</span>
      </a>

      <nav class="links" :class="{ open: menuOpen }">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu">
          {{ link.label }}
        </a>
        <a :href="profile.github" target="_blank" rel="noopener" class="github-link">GitHub</a>
      </nav>

      <button
        class="hamburger"
        :aria-expanded="menuOpen"
        aria-label="切换菜单"
        @click="menuOpen = !menuOpen"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.25s ease, border-color 0.25s ease;
  border-bottom: 1px solid transparent;
}

/* 滚动后：实色背景（无毛玻璃），底边细线 */
.nav.scrolled {
  background: var(--bg);
  border-bottom-color: var(--border);
}

/* 高度收纳：68px → 52px，过渡平滑 */
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  transition: height 0.25s ease;
}

.nav.scrolled .nav-inner {
  height: 52px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
}

.logo-mark {
  font-family: var(--font-mono);
  font-weight: 400;
  color: var(--accent);
}

.logo-name {
  font-size: 1.02rem;
}

.links {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 0.92rem;
  color: var(--muted);
}

.links a {
  transition: color 0.2s ease;
}

.links a:hover {
  color: var(--accent);
}

.github-link {
  font-family: var(--font-mono);
  font-size: 0.84rem;
}

/* 汉堡按钮：桌面端隐藏 */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 6px;
}

.hamburger span {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

@media (max-width: 720px) {
  .hamburger {
    display: flex;
  }

  /* 移动端：菜单收起时隐藏，展开时实色全宽下拉 */
  .links {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 28px 22px;
    gap: 16px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .links.open {
    display: flex;
  }
}
</style>
