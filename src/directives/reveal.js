/**
 * @file v-reveal 自定义指令 —— 基于 IntersectionObserver 的滚动渐显动画
 *
 * 用法：
 *   <div v-reveal>...</div>                        进入视口时上浮渐显
 *   <div v-reveal="{ delay: 100 }">...</div>       延迟 100ms 出现（用于卡片交错动画）
 *
 * 样式约定：初始态与过渡定义在 main.css 的 .reveal / .is-visible 中
 */

/** @type {IntersectionObserver | null} 懒加载的单例观察器，首个元素挂载时才创建 */
let observer = null

/**
 * 获取全局唯一的 IntersectionObserver 实例（懒创建）
 * 元素进入视口后添加 .is-visible 类并停止跟踪，保证动画只播放一次
 * @returns {IntersectionObserver} 观察器单例
 */
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      // 元素露出 15% 时触发，视觉上比完全进入更自然
      { threshold: 0.15 },
    )
  }
  return observer
}

/**
 * v-reveal 指令定义对象
 */
export const reveal = {
  /**
   * 元素挂载时：标记初始态类并纳入视口观察
   * @param {HTMLElement} el 绑定指令的 DOM 元素
   * @param {{value?: {delay?: number}}} binding 指令绑定值，可传 delay 控制交错延迟
   */
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = binding.value?.delay
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }
    getObserver().observe(el)
  },

  /**
   * 元素卸载时：停止观察，防止内存泄漏
   * @param {HTMLElement} el 绑定指令的 DOM 元素
   */
  unmounted(el) {
    observer?.unobserve(el)
  },
}
