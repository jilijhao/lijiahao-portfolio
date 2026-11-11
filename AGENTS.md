# AGENTS.md — 项目协作规范

本文件对使用英文或中文的协作者同样生效。改动代码前先读一遍。

## 项目总结

- 李家豪的个人单页作品集，基于 **Next.js 16 App Router**（静态导出）+ React 19 + TypeScript + Tailwind CSS 4 + framer-motion。
- `next.config.ts` 启用 `output: "export"`，产物是纯静态站点，部署在 GitHub Pages 子路径 `/lijiahao-portfolio`。
- 线上地址：https://jilijhao.github.io/lijiahao-portfolio/
- 没有后端、没有数据库、没有文章系统。所有内容都写在 `lib/data.ts`。

## 关键路径

| 路径 | 作用 |
| --- | --- |
| `lib/data.ts` | **所有文案的单一数据源**，改个人内容只改这里 |
| `app/page.tsx` | 首页，按顺序组合各区块 |
| `app/layout.tsx` | 根布局、字体、SEO metadata |
| `app/globals.css` | 全局样式、网格背景、锚点偏移 |
| `components/` | 各区块组件与通用 `Reveal` / `SectionHeading` |
| `public/` | 静态资源 |
| `next.config.ts` | 静态导出与 `basePath` / `assetPrefix` |
| `.github/workflows/deploy.yml` | push main 后自动构建并发布 Pages |

## 主要命令

```bash
pnpm dev      # 本地开发，http://localhost:3000
pnpm build    # 静态导出到 out/
pnpm lint     # ESLint
```

提交前必须跑 `pnpm build` 和 `pnpm lint`，两者都通过再提交。

## 硬性约束

1. **保持 `output: "export"` 兼容**：不要新增 serverless API 路由、SSR 路由或依赖运行时服务端的功能。需要动态内容时改为构建期静态生成。
2. **生产态路径**：`basePath` / `assetPrefix` 只在 `NODE_ENV === "production"` 时设为 `/lijiahao-portfolio`。若改动静态资源路径或部署子路径，必须同步改 `next.config.ts`，并验证线上资源不 404。
3. **站内锚点用原生 `<a href="#...">`**，不要用 `next/link` 拼锚点，避免 basePath 下生成错误路径。
4. **隐私**：不要把手机号、薪资、求职意向、住址等私人信息写进仓库，公开站点只保留邮箱与 GitHub 链接。
5. **依赖**：不轻易新增依赖；新增后必须同时更新 `pnpm-lock.yaml`。

## 内容维护

- 改文案、数字、项目清单、技能分组、工作经历 → 只编辑 `lib/data.ts`。
- 组件只负责渲染，不要把业务文案硬编码进组件。
- `projects[].span` 控制 Bento 卡片跨度：`wide`（2 列）、`normal`（1 列）、`full`（3 列通栏）。当前 6 张卡刚好铺满 3 行，增删卡片时检查网格是否留空。

## 代码约定

- 组件用 TypeScript + 函数式组件；需要交互或动画的组件加 `"use client"`。
- 样式以 Tailwind 工具类为主，重复的卡片样式可抽成复用类或子组件；不要写全局选择器覆盖组件样式。
- 滚动动效统一走 `components/Reveal.tsx`，不要各组件自己写 `whileInView`。
- 注释用单行或 JSDoc，单行不超过 80 字符；对外导出组件写 1 行职责说明即可。

## 本地环境已知问题（macOS / WorkBuddy）

- 托管 Node（`~/.workbuddy/binaries/node/...`）跑 `pnpm install` 会出现 Worker 崩溃；用系统 Node 代替：
  `/opt/homebrew/bin/node <pnpm 全局路径>/bin/pnpm.cjs install --frozen-lockfile --registry=https://registry.npmjs.org/`
- 国内 npm 镜像的 tarball 会 302 到 CDN 并在 pnpm 下失败，装依赖用官方源。
- pnpm 11 会在根目录生成 `pnpm-workspace.yaml` 占位文件，已加入 `.git/info/exclude`，不要提交。
- pnpm 11 执行 script 前会自动重跑 install，必要时加 `--config.verify-deps-before-run=false`。
- 旧版本本文件曾要求读 `node_modules/next/dist/docs/migration.md` 与 `deprecations.md`，**Next 16.2.6 中这两个文件不存在**，已废弃该要求；需要查文档时直接看 `node_modules/next/dist/docs/` 下实际存在的目录。

## 发布流程

1. 本地 `pnpm lint` + `pnpm build` 全绿。
2. 提交到 `main`（GitHub Actions 只在 push main 时触发）。
3. 到仓库 Actions 页确认 `Deploy Next.js site to Pages` 成功。
4. 打开线上地址核对标题、样式资源与新增文案。
