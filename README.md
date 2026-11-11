# 李家豪 · 个人站点

个人单页作品集，记录数字化实施、AI 智能体、低代码与 BI 数据看板相关的项目实践。

**线上地址**：https://jilijhao.github.io/lijiahao-portfolio/

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Next.js 16（App Router，`output: "export"` 静态导出） |
| UI | React 19、TypeScript、Tailwind CSS 4 |
| 动效 | framer-motion（`whileInView` 滚动淡入） |
| 图标 | react-icons |
| 包管理 | pnpm（lockfileVersion 9.0） |
| 部署 | GitHub Actions → GitHub Pages |

## 页面结构

`Navbar` → `Hero` → `About` → `Skills` → `Experience` → `Projects` → `Contact` → `Footer`

深色科技风 + Bento 网格，桌面三列、移动端单列，导航在窄屏折叠为菜单。

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build    # 产物在 out/
```

> macOS 上若托管 Node 跑 `pnpm install` 出现 Worker 崩溃，改用系统 Node 执行 pnpm CLI，详见 `AGENTS.md`「本地环境已知问题」。

## 更新内容

**只改 [`lib/data.ts`](lib/data.ts)**。个人简介、数字、优势、技能分组、工作经历、项目清单与联系方式全部集中在这里，组件不含硬编码文案。

- 新增项目：往 `projects` 数组加一项，指定 `span`（`wide` / `normal` / `full`），并确认 Bento 网格仍能铺满。
- 换邮箱或 GitHub：改 `profile.email` / `profile.github`。
- 不要写手机号、薪资、求职意向等私人信息到公开仓库。

## 部署

push 到 `main` 会自动触发 `.github/workflows/deploy.yml`：pnpm 安装 → `pnpm build` → 上传 `out/` → 发布 Pages。

生产态通过 `next.config.ts` 的 `basePath` / `assetPrefix` 挂到 `/lijiahao-portfolio` 子路径；改部署路径时必须同步改这两处。

## 目录

```
app/                 页面入口、根布局、全局样式
components/          各区块组件 + Reveal / SectionHeading
lib/data.ts          全部文案数据
public/              静态资源
.github/workflows/    Pages 部署流水线
AGENTS.md            协作规范与硬性约束
```
