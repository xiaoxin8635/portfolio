/**
 * @file 应用入口 —— 创建 Vue 实例并引入全局样式
 */
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.mount('#app')
