# AGENTS.md — 项目协作规范

本文件对使用英文或中文的协作者同样生效。改动代码前先读一遍。

## 项目总结

- 李家豪的个人站点，已重构为 **macOS 桌面拟物** 形态：壁纸 + 菜单栏 + 桌面图标 + 可拖拽窗口 + 底部程序坞。
- 基于 **Next.js 16 App Router**（`output: "export"` 静态导出）+ React 19 + TypeScript + Tailwind CSS 4 + react-icons。
- 产物是纯静态站点，部署在 GitHub Pages 子路径 `/lijiahao-portfolio`。
- 线上地址：https://jilijhao.github.io/lijiahao-portfolio/
- 没有后端、没有数据库、没有文章系统。项目窗口当前是**空状态**，等内容补齐。随笔窗口有录入（存 `localStorage`，key `desktop.memos.v1`），只在本机可见、不联网，所以别把「公开可见的随笔」做在这里——那种内容要进 `lib/data.ts` 随仓库发布。

## 关键路径

| 路径 | 作用 |
| --- | --- |
| `lib/desktop.ts` | **窗口清单与占位文案**：图标、渐变色、窗口尺寸、Dock 顺序、`placeholder` 文案 |
| `lib/data.ts` | **个人资料单一数据源**：姓名、邮箱、GitHub、数字、优势、技能、教育 |
| `components/desktop/Desktop.tsx` | 桌面壳：窗口状态机、打开/聚焦/关闭/最小化、Esc 处理、响应式 bounds |
| `components/desktop/WindowFrame.tsx` | 窗口外壳与拖拽逻辑（Pointer Events + `setPointerCapture`） |
| `components/desktop/MenuBar.tsx` | 顶部菜单栏、应用菜单、实时时钟 |
| `components/desktop/Dock.tsx` | 底部程序坞、运行中指示点 |
| `components/desktop/windows/index.tsx` | 五个窗口的具体内容 |
| `app/page.tsx` | 首页，只渲染 `<Desktop />` |
| `app/globals.css` | 壁纸、窗口、Dock、便签、移动端降级的全部样式 |
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

1. **保持 `output: "export"` 兼容**：不要新增 serverless API 路由、SSR 路由或依赖运行时服务端的功能。桌面交互全部是客户端行为，不需要服务端。
2. **生产态路径**：`basePath` / `assetPrefix` 只在 `NODE_ENV === "production"` 时设为 `/lijiahao-portfolio`。改动部署路径必须同步改 `next.config.ts`，并验证线上资源不 404。
3. **窗口定位只用 CSS 变量**（`--wx / --wy / --ww / --wh`），不要在元素上写 `left/top` 内联样式 —— 移动端要靠样式表整体接管，内联样式会盖掉媒体查询。
4. **拖拽只在 ≥768px 启用**，由 `WindowFrame` 在 `pointerdown` 时判断；窄屏下窗口铺满宽度、高度随内容、不允许拖动。
5. **不要在 render 期间读 `ref.current`**（React 19 的 `react-hooks/refs` 规则会直接报错）。层级用 `activeId` state 表达，不要拿 ref 计数器参与渲染。
6. **图标渐变用内联色值**，不要用 `lib` 里的 Tailwind 类名片段 —— Tailwind 扫不到会导致图标没底色。
7. **隐私**：不要把手机号、薪资、求职意向、住址写进仓库，公开站点只保留邮箱与 GitHub 链接。教培相关案例必须使用合成数据。
8. **依赖**：不轻易新增依赖；新增后必须同时更新 `pnpm-lock.yaml`。
9. **图标三件套要同步**：`app/icon.svg` 是矢量源，`app/favicon.ico`（16/32/48）与 `app/apple-icon.png`（180）由它栅格化，改图形时三份一起换。`layout.tsx` 里必须**显式**声明 `icons`：只靠 `app/` 文件约定时 Next 只注入 `icon.svg`，而 Safari 不支持 SVG favicon，会退回去请求域名根目录的 `/favicon.ico` —— 站点在子路径下必然 404。图标 href 用相对路径，避免 `basePath` 被漏掉。
10. **窄屏断点同时覆盖横屏手机**：条件是 `(max-width: 767px), (max-height: 460px) and (max-width: 900px)`。手机横屏宽度 >768 但高度只有 ~375，只按宽度判断会掉进桌面规则，窗口比视口还高、底部直接跑出屏幕。
11. **窄屏下窗口只有一个**：窗口高度随内容自适（`height: auto` + `max-height`），叠放时后面的窗口会从前面下方露出一截，所以 `.win-shell:not(.is-active)` 直接 `display: none`。配套地，`Desktop.tsx` 用派生出来的 `activeWindow` 而不是裸的 `activeId` —— 否则关掉当前窗口后激活态还指向已关闭的窗口，手机上会一个窗口都不显示。
12. **窗口尺寸在 resize 时要重算，不能只钳位置**：只钳 `x/y` 的话，桌面切到横屏时 `w/h` 还是旧值。`Desktop.tsx` 的 `onResize` 用 `Math.min(state.w, fit.w)` 收一次尺寸。

## 内容维护

- 改定位、空状态提示、便签文案 → 改 `lib/desktop.ts` 的 `placeholder`。当前这些是**占位文案**，新定位定下来后整体替换。
- 改姓名、邮箱、数字、技能、教育 → 改 `lib/data.ts`。
- 改窗口名称、图标、尺寸、Dock 顺序 → 改 `lib/desktop.ts` 的 `APPS`。
- 新增一个窗口：① `APPS` 加一项（`window` 尺寸 + `offset` 错位序号）；② `AppId` / `IconKey` 补类型；③ `windows/index.tsx` 加内容组件；④ `Desktop.tsx` 的 `windowBody` 加分支。
- 项目内容补齐时，替换 `ProjectsWindow` 里的骨架卡片，`placeholder.projectsEmpty*` 一并删除。

## 代码约定

- 组件用 TypeScript + 函数式组件；只有 `Desktop.tsx` 需要 `"use client"`，其余都在客户端树内。
- 样式：结构性布局用 Tailwind 工具类，桌面/窗口/程序坞等复用组件用 `globals.css` 里的语义类（`.win-shell`、`.dock-item` 等）。
- 注释用单行或 JSDoc，单行不超过 80 字符；对外导出组件写 1 行职责说明即可。
- `framer-motion` 仍在依赖里但当前未使用（重构前用于滚动淡入），后续可移除；移除时同步更新 lockfile。

## 本地环境已知问题（macOS / WorkBuddy）

- 托管 Node（`~/.workbuddy/binaries/node/...`）跑 `pnpm install` 会出现 Worker 崩溃；用系统 Node 代替：
  `/opt/homebrew/bin/node <pnpm 全局路径>/bin/pnpm.cjs install --frozen-lockfile --registry=https://registry.npmjs.org/`
- 国内 npm 镜像的 tarball 会 302 到 CDN 并在 pnpm 下失败，装依赖用官方源。
- pnpm 11 会在根目录生成 `pnpm-workspace.yaml` 占位文件，已加入 `.git/info/exclude`，不要提交。
- pnpm 11 执行 script 前会自动重跑 install，必要时加 `--config.verify-deps-before-run=false`。
- 清 `.next` / `out` 会触发 WorkBuddy 的 safe-delete 批量保护，需先 `export CODEBUDDY_SAFE_DELETE_ENABLED=0`，并用 Python `shutil.rmtree`。
- 本地验证静态产物要挂子路径：`cp -R out /tmp/site-root/lijiahao-portfolio` 后 `python3 -m http.server`，否则 `basePath` 下资源全 404。
- 旧版本本文件曾要求读 `node_modules/next/dist/docs/migration.md` 与 `deprecations.md`，**Next 16.2.6 中这两个文件不存在**，已废弃该要求。

## 发布流程

1. 本地 `pnpm lint` + `pnpm build` 全绿。
2. 挂子路径用 headless Chrome 验证：窗口打开、拖拽、最小化、Esc、375px 无横向溢出。
3. 提交到 `main`（GitHub Actions 只在 push main 时触发）。
4. 到仓库 Actions 页确认 `Deploy Next.js site to Pages` 成功。
5. 打开线上地址核对标题、样式资源与交互。
