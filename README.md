# 个人作品集网站

基于 **Vue 3 + Vite** 构建的响应式单页作品集，托管于 **Cloudflare**（Git 集成自动部署）。

核心特性：`git push` 后 Cloudflare 自动拉取代码 → 构建 → 部署到全球 CDN，**1~2 分钟内线上站点自动更新**，全程零服务器、零运维。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 构建 | Vite 8 |
| 部署 | Cloudflare 静态托管（Git 集成自动部署，`*.workers.dev` / `*.pages.dev` 子域） |
| 字体 | Space Grotesk + JetBrains Mono（woff2 本地自托管，不依赖 Google Fonts） |
| 动效 | Hero 一次性 CSS 入场编排（适配 `prefers-reduced-motion`，无滚动渐显） |

## 本地开发

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
npm run build   # 生产构建，输出到 dist/
npm run preview # 本地预览生产构建产物
```

## 目录结构

```
├── index.html                    # HTML 入口（SEO / OG 元信息、theme-color、字体预加载）
├── public/
│   ├── favicon.svg               # 站点图标
│   ├── fonts/                    # 自托管字体（Space Grotesk / JetBrains Mono）
│   └── icons/                    # 自托管技术栈图标（devicon SVG，24 个）
├── src/
│   ├── main.js                   # 应用入口
│   ├── App.vue                   # 根组件（板块编排）
│   ├── assets/main.css           # 设计 token 与全局样式（琥珀金浅色主题）
│   ├── data/profile.js           # ★ 网站内容配置（手工数据源）
│   ├── data/github.js            # GitHub 动态数据（仓库列表 + 语言分布，快照兜底）
│   ├── data/langMeta.js          # 语言元数据（自托管图标路径 + GitHub 官方语言色）
│   └── components/
│       ├── NavBar.vue            # 固定导航（滚动收纳细条 + 移动端菜单）
│       ├── HeroSection.vue       # 首屏（左文右 profile.js 代码窗口，全站唯一深色块）
│       ├── ProjectsSection.vue   # 项目展示（双列卡片网格 + 技术图标）
│       ├── SkillsSection.vue     # 技术栈（语言分布官方色条 + 分组清单）
│       ├── AboutSection.vue      # 关于我 + 时间线
│       ├── ContactSection.vue    # 联系方式（大字邮箱）
│       └── FooterBar.vue         # 页脚
└── vite.config.js                # Vite 配置
```

## 修改网站内容

**只需编辑 `src/data/profile.js`** —— 姓名、职位、经历、联系方式全部集中在该文件，改完 push 即自动上线：

1. 邮箱、项目等字段已填入真实信息，日常只需按需增删
2. `projects` 数组仅用于**手工置顶条目**（如本站）；其余项目自动从 GitHub 同步（见下节）
3. 经历时间线（`timeline`）当前为空、页面上自动隐藏，需要展示时按文件内注释格式添加条目即可
3. 提交并推送：

```bash
git add . && git commit -m "docs: 更新个人信息" && git push
```

## GitHub 动态数据

项目列表与技术栈语言分布**运行时从 GitHub API 自动拉取**（`src/data/github.js`）：

- 你在 GitHub 上新建 / 更新公开仓库后，网站**无需重新部署**即可展示最新内容（访客浏览器实时拉取）
- 数据策略：localStorage 缓存 1 小时 → 实时请求（超时 6 秒）→ 内嵌真实快照兜底（API 不可用时仍正常展示）
- 语言分布聚合自各仓库 `languages` 接口的真实字节占比（过滤占比 <1% 的噪音项，最多 6 项）
- 快照更新方式：仓库内容有大幅变化时，手动更新 `github.js` 中的 `SNAPSHOT` 常量（当前生成于 2026-10-09）

> 注意：未认证 GitHub API 限额为 60 次/小时/IP，访客浏览器各自计数并有一小时缓存，个人站点完全够用。

## 部署到 Cloudflare

首次部署（一次性配置，之后全自动）：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单 **Workers & Pages → Create**，通过 Git 连接入口授权 GitHub 并选择本仓库
   - 新版控制台中 Workers 与 Pages 均支持「连接 Git 仓库自动构建」，对本项目（纯静态站点）完全等价，区别仅在默认子域：`*.workers.dev` 或 `*.pages.dev`
3. 构建配置：
   - **Project name**：即访问子域（如 `portfolio` → `portfolio.<账户子域>.workers.dev`）
   - **Production branch**：`main`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
4. 保存并部署，等待首次构建完成

之后的日常更新：**push 到 `main` 分支即自动部署**；push 到其他分支会生成独立的预览 URL（Preview deployments），不影响线上。

## 常见问题

- **构建失败？** 本地先跑 `npm run build` 复现；Cloudflare 构建日志在项目的 **Deployments** 页可查。
- **想换域名？** 在项目的域名设置中添加自定义域名（Workers 为 **Settings → Domains & Routes**，Pages 为 **Custom domains**；域名需先接入 Cloudflare DNS）。
- **Node 版本？** Vite 8 要求 Node 20.19+ / 22.12+，Cloudflare 默认构建环境已满足；如需固定版本，可在 `package.json` 中加 `"engines"` 字段。
