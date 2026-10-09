<!--
  @file 根组件 —— 单页作品集的板块编排
  板块顺序：导航栏 / 首屏 Hero / 项目展示 / 技能 / 关于 / 联系 / 页脚
-->
<script setup>
/**
 * 根组件：仅负责板块组合，各板块的具体实现见 src/components 目录
 */
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <AboutSection />
    <ContactSection />
  </main>
  <FooterBar />
</template>
