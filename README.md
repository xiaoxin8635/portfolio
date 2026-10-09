# 个人作品集网站

基于 **Vue 3 + Vite** 构建的响应式单页作品集，托管于 **Cloudflare**（Git 集成自动部署）。

核心特性：`git push` 后 Cloudflare 自动拉取代码 → 构建 → 部署到全球 CDN，**1~2 分钟内线上站点自动更新**，全程零服务器、零运维。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 构建 | Vite 8 |
| 部署 | Cloudflare 静态托管（Git 集成自动部署，`*.workers.dev` / `*.pages.dev` 子域） |
| 动画 | IntersectionObserver 自定义指令 `v-reveal`（零依赖） |

## 本地开发

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
npm run build   # 生产构建，输出到 dist/
npm run preview # 本地预览生产构建产物
```

## 目录结构

```
├── index.html                    # HTML 入口（SEO / OG 元信息在此修改）
├── public/
│   └── favicon.svg               # 站点图标
├── src/
│   ├── main.js                   # 应用入口（注册 v-reveal 指令）
│   ├── App.vue                   # 根组件（板块编排）
│   ├── assets/main.css           # 设计变量与全局样式
│   ├── data/profile.js           # ★ 网站内容配置（唯一数据源）
│   ├── directives/reveal.js      # v-reveal 滚动渐显指令
│   └── components/
│       ├── NavBar.vue            # 固定导航（毛玻璃 + 移动端菜单）
│       ├── HeroSection.vue       # 首屏
│       ├── ProjectsSection.vue   # 项目展示
│       ├── SkillsSection.vue     # 技术栈
│       ├── AboutSection.vue      # 关于我 + 时间线
│       ├── ContactSection.vue    # 联系方式
│       └── FooterBar.vue         # 页脚
└── vite.config.js                # Vite 配置
```

## 修改网站内容

**只需编辑 `src/data/profile.js`** —— 姓名、职位、项目、技能、经历、联系方式全部集中在该文件，改完 push 即自动上线：

1. 替换标注 `TODO` 的字段（邮箱、示例项目、经历）
2. `projects` 数组增删项目卡片，每项支持 `github` / `demo` 链接（留空则不显示对应入口）
3. 提交并推送：

```bash
git add . && git commit -m "docs: 更新个人信息" && git push
```

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
