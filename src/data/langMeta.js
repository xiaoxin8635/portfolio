/**
 * @file 语言/技术元数据 —— 图标路径与 GitHub 官方语言色映射
 *
 * 图标为自托管 devicon SVG（public/icons/，共 24 个，单个 <6KB），不依赖外部 CDN；
 * color 取 GitHub Linguist 官方语言色，用于项目卡片兜底色点与技能区分布条。
 * 未收录的语言由调用方按首字母渲染字符块兜底，不留空白。
 */

/** 语言名 → { icon: 自托管图标路径, color: GitHub 官方语言色 } */
export const LANG_META = {
  Python: { icon: '/icons/python.svg', color: '#3572A5' },
  JavaScript: { icon: '/icons/javascript.svg', color: '#f1e05a' },
  TypeScript: { icon: '/icons/typescript.svg', color: '#3178c6' },
  HTML: { icon: '/icons/html5.svg', color: '#e34c26' },
  CSS: { icon: '/icons/css3.svg', color: '#563d7c' },
  Vue: { icon: '/icons/vuejs.svg', color: '#41b883' },
  'Node.js': { icon: '/icons/nodejs.svg', color: '#339933' },
  Go: { icon: '/icons/go.svg', color: '#00ADD8' },
  Shell: { icon: '/icons/bash.svg', color: '#89e051' },
  Java: { icon: '/icons/java.svg', color: '#b07219' },
  C: { icon: '/icons/c.svg', color: '#555555' },
  'C++': { icon: '/icons/cplusplus.svg', color: '#f34b7d' },
  'C#': { icon: '/icons/csharp.svg', color: '#178600' },
  Rust: { icon: '/icons/rust.svg', color: '#dea584' },
  PHP: { icon: '/icons/php.svg', color: '#4F5D95' },
  Ruby: { icon: '/icons/ruby.svg', color: '#701516' },
  Swift: { icon: '/icons/swift.svg', color: '#F05138' },
  Kotlin: { icon: '/icons/kotlin.svg', color: '#A97BFF' },
  Dart: { icon: '/icons/dart.svg', color: '#00B4AB' },
  Lua: { icon: '/icons/lua.svg', color: '#000080' },
  Dockerfile: { icon: '/icons/docker.svg', color: '#2496ED' },
  'Vue 3': { icon: '/icons/vuejs.svg', color: '#41b883' },
  Vite: { icon: '/icons/vite.svg', color: '#646CFF' },
  Cloudflare: { icon: '/icons/cloudflare.svg', color: '#F38020' },
}

/**
 * 查询语言图标路径
 * @param {string} name 语言名（如 'Python'）
 * @returns {string|null} 图标路径；未收录返回 null（调用方渲染字符块兜底）
 */
export function langIcon(name) {
  return LANG_META[name]?.icon || null
}

/**
 * 查询语言官方色
 * @param {string} name 语言名
 * @param {string} fallback 未收录时的兜底色（CSS 颜色值）
 * @returns {string} CSS 颜色值
 */
export function langColor(name, fallback = 'var(--steel)') {
  return LANG_META[name]?.color || fallback
}
