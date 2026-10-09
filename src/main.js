/**
 * @file 应用入口 —— 创建 Vue 实例、注册全局指令与样式
 */
import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import './assets/main.css'

const app = createApp(App)

// 注册 v-reveal 指令：元素滚动进入视口时触发上浮渐显动画
app.directive('reveal', reveal)

app.mount('#app')
