/**
 * @file 网站内容配置（唯一数据源）
 *
 * 站点所有文案集中在此文件，修改后 git push 即自动更新线上站点。
 * 使用说明：
 * 1. 把标注 TODO 的字段替换成你的真实信息
 * 2. projects / skillGroups / timeline 中的示例条目可自由增删
 */

/** 站点主人基础信息（导航栏 / 首屏 / 页脚共用） */
export const profile = {
  /** 显示姓名 */
  name: '陈琦勇',
  /** 英文名（可选，暂未在页面使用，留作扩展） */
  nameEn: 'Chen Qiyong',
  /** 职位定位（首屏第二行） */
  role: '全栈开发者 / Full-Stack Developer',
  /** 一句话介绍（首屏第三行） */
  tagline: '热爱把想法变成可运行的产品，关注工程质量与交付体验。',
  /** 所在地 */
  location: 'China',
  /** 联系邮箱 —— TODO: 替换为你的真实邮箱 */
  email: 'hello@example.com',
  /** GitHub 主页（导航 / 首屏 / 联系板块的跳转链接） */
  github: 'https://github.com/xiaoxin8635',
  /** 首屏技能标签（chip 列表，建议 4~6 个最能代表你的技术） */
  heroTags: ['Vue 3', 'TypeScript', 'Node.js', 'Cloudflare', 'Git'],
}

/**
 * 关于我板块的介绍段落（每项渲染为一个段落）
 * TODO: 替换为你的真实介绍
 * @type {string[]}
 */
export const aboutText = [
  '你好，我是陈琦勇，一名全栈开发者。专注于 Web 应用的设计与实现，从界面交互到服务端接口都有实践经验。',
  '我喜欢简洁可维护的代码和顺手的工程化流程 —— 这个网站本身就是一次实践：代码托管在 GitHub，由 Cloudflare 在每次 push 后自动构建并部署到全球 CDN。',
]

/**
 * 项目列表（Projects 板块）
 * @type {Array<{index: string, title: string, description: string, tech: string[], github?: string, demo?: string}>}
 * TODO: 将示例项目替换为你自己的真实项目
 */
export const projects = [
  {
    /** 卡片编号（纯展示用，按顺序递增即可） */
    index: '01',
    title: '个人作品集网站（本站）',
    description:
      '基于 Vue 3 + Vite 构建的响应式单页作品集，托管于 Cloudflare。git push 后 1~2 分钟内自动构建上线，全球 CDN 加速。',
    tech: ['Vue 3', 'Vite', 'Cloudflare'],
    /** GitHub 仓库链接（不填则不显示该入口） */
    github: 'https://github.com/xiaoxin8635/portfolio',
    /** 在线演示链接（可选，不填则不显示该入口） */
    demo: '',
  },
  {
    index: '02',
    title: '【示例】后台管理系统',
    description:
      '替换成你的真实项目：一句话说清楚它解决了什么问题、你负责的部分，以及亮点数据（性能提升幅度 / 用户量等）。',
    tech: ['Vue 3', 'Element Plus', 'Node.js'],
    github: 'https://github.com/xiaoxin8635',
    demo: '',
  },
  {
    index: '03',
    title: '【示例】开源工具库',
    description:
      '替换成你的真实项目：没有截图也没关系，清晰的描述与准确的技术栈标签更能体现工程能力。',
    tech: ['TypeScript', 'Vitest', 'CI/CD'],
    github: 'https://github.com/xiaoxin8635',
  },
]

/**
 * 技能分组（Skills 板块）
 * TODO: 按你的真实技术栈调整
 * @type {Array<{name: string, items: string[]}>}
 */
export const skillGroups = [
  { name: '前端', items: ['Vue 3', 'React', 'TypeScript', 'Vite', 'Vitest'] },
  { name: '后端', items: ['Node.js', 'Express', 'RESTful API', 'MySQL', 'Redis'] },
  { name: '工程与云', items: ['Git', 'GitHub Actions', 'Docker', 'Cloudflare', 'Linux'] },
]

/**
 * 个人经历时间线（About 板块，按时间倒序排列）
 * TODO: 替换为你的真实经历
 * @type {Array<{period: string, title: string, description: string}>}
 */
export const timeline = [
  {
    /** 时间段（年份或区间，如 2023 / 2020-2024） */
    period: '20XX',
    title: '【示例】XX 公司 · 前端开发工程师',
    description: '负责核心业务前端开发，推动组件化改造与页面性能优化。',
  },
  {
    period: '20XX',
    title: '【示例】XX 大学 · 计算机科学与技术',
    description: '在校期间系统学习 Web 全栈技术，完成多个实践项目。',
  },
]

/** 页脚左侧的备注文案 */
export const footerNote = '用 Vue 构建 · 托管于 Cloudflare'
