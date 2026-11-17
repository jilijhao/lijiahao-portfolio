# 李家豪 · 个人桌面

把个人站点做成一个像操作系统桌面的界面：壁纸、菜单栏、桌面图标、可拖拽窗口和底部程序坞。内容以「窗口」的形式打开，而不是一路往下滚。

**线上地址**：https://jilijhao.github.io/lijiahao-portfolio/

## 交互

| 操作 | 效果 |
| --- | --- |
| 单击桌面图标 / Dock 图标 | 打开或聚焦对应窗口 |
| 拖动窗口标题栏 | 移动窗口（限制在视口内） |
| 双击标题栏 / 点绿色圆点 | 最大化 / 还原 |
| 点黄色圆点 | 最小化到程序坞（Dock 下方圆点保持点亮） |
| 点红色圆点 / 按 `Esc` | 关闭最上层窗口 |
| 点窗口任意位置 | 置顶该窗口 |

窄屏（< 768px）自动降级：桌面图标变成网格、窗口铺满宽度、拖动关闭、Dock 变成底部横栏。

## 窗口内容

| 窗口 | 内容 |
| --- | --- |
| 欢迎 | 一句话定位 + 简介 + 三个去处 + 四个关键数字 |
| 关于我 | 简介、四条做事方式、技术栈标签、教育经历 |
| 项目 | **当前为空状态**，只有骨架卡片和去处提示 |
| 随笔 | 内容来自飞书多维表格，构建前同步成 `data/memos.json`；站点只读 |
| 联系 | 邮箱、GitHub、个人工作台外链 |
| 工作台 | 外链到 [personal-workbench](https://jilijhao.github.io/personal-workbench/) |

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Next.js 16（App Router，`output: "export"` 静态导出） |
| UI | React 19、TypeScript、Tailwind CSS 4 |
| 图标 | react-icons |
| 交互 | 原生 Pointer Events（拖拽未引入第三方库） |
| 包管理 | pnpm（lockfileVersion 9.0） |
| 部署 | GitHub Actions → GitHub Pages |

窗口位置与尺寸通过 CSS 变量 `--wx / --wy / --ww / --wh` 下发，移动端由样式表接管，不在 JS 里做设备分支。

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build    # 产物在 out/
```

> macOS 上若托管 Node 跑 `pnpm install` 出现 Worker 崩溃，改用系统 Node 执行 pnpm CLI，详见 `AGENTS.md`「本地环境已知问题」。

## 更新内容

三个数据源，按改什么选：

- **[`lib/desktop.ts`](lib/desktop.ts)** —— 窗口清单（名称、图标、渐变色、初始尺寸与错位）、Dock 顺序，以及**待替换的占位文案**（`placeholder`）。改定位、改空状态提示、加窗口都改这里。
- **[`lib/data.ts`](lib/data.ts)** —— 个人资料：姓名、邮箱、GitHub、关键数字、优势、技能分组、教育经历。
- **[`data/memos.json`](data/memos.json)** —— 随笔。**不要手改**，它由飞书多维表格同步而来（见下节）。

组件只负责渲染，不含硬编码业务文案。不要写手机号、薪资、求职意向等私人信息到公开仓库。

## 随笔：在页面上直接写

写的地方就是站点本身。GitHub Pages 没有后端，所以写入靠站主自己浏览器里的
GitHub Token 直接调 Contents API 提交 `data/memos.json`，提交后 Actions 自动重建，
约 1 分钟后全站生效。访客只读。

**为什么不让页面直接写飞书**：飞书换 `user_access_token` 时 `client_secret` 是必填的
（`code_verifier` 只是 PKCE 的补充，不能替代密钥），secret 一进浏览器就等于公开。
静态站没有地方藏它，所以写入只能走 GitHub 这条自带鉴权的路。

**站主开启写入**（每台设备各一次）：

1. 打开 <https://github.com/settings/tokens?type=beta> 建一个 Fine-grained token
2. Repository access 只选 `lijiahao-portfolio`；Permissions 里 `Contents` 设为 `Read and write`
3. 到站点点「随笔」→「想在这里写？先在这台设备启用写入」→ 粘贴 → 保存并校验
4. Token 只存在该设备的 `localStorage`，不进仓库、不发给第三方；随时可在 GitHub 撤销，或在页面底部点「移除」

**并发安全**：页面加载的是构建快照，可能已经落后（比如另一台设备刚写过）。
所以每次写入都先读仓库当前内容再做增量（`addMemo` / `removeMemo`），
不会用页面里的数组整体覆盖——否则会把别处刚写的内容冲掉。

### 可选：从飞书批量导入

`scripts/sync-memos.mjs` 还能把飞书多维表格「个人站随笔」
（base `C0YpbtD3Jaik05suk4ZcB2JEnEb`，table `tblRPVQVpSdBylCc`）
导出成 `data/memos.json`，用来一次性搬迁历史内容。
CI **不再**调用它——构建时若从外部源覆盖这个文件，会把页面上刚写的内容冲掉。

```bash
lark-cli base +record-list --base-token C0YpbtD3Jaik05suk4ZcB2JEnEb \
  --table-id tblRPVQVpSdBylCc \
  --format ndjson --output ./memos.ndjson --overwrite --as user
node scripts/sync-memos.mjs --from-ndjson ./memos.ndjson   # 加 --strict 让错误直接抛出
```

表格结构：内容（多行文本，必填）/ 时间（日期，可空，空则回落到「创建时间」）/
创建时间（系统自动）/ 发布（复选框，不勾视为草稿）。

## 部署

push 到 `main` 自动触发 `.github/workflows/deploy.yml`：pnpm 安装 → 飞书随笔同步 → `pnpm build` → 上传 `out/` → 发布 Pages。

生产态通过 `next.config.ts` 的 `basePath` / `assetPrefix` 挂到 `/lijiahao-portfolio` 子路径；改部署路径时必须同步改这两处。GitHub Pages 只能托管静态文件，站点不含任何服务端能力。

## 目录

```
app/                          页面入口、根布局、全局样式
  icon.svg                    站点图标矢量源（浏览器标签页、书签）
  favicon.ico                 16/32/48 三档位图，给不支持 SVG 图标的浏览器（Safari）
  apple-icon.png              180×180 满幅方图，iOS 添加到主屏时使用
components/desktop/
  Desktop.tsx                 桌面壳：窗口状态、打开/聚焦/关闭、Esc
  WindowFrame.tsx             可拖拽窗口外壳（三色圆点、标题、边界约束）
  MenuBar.tsx                 顶部菜单栏与实时时钟
  DesktopIcon.tsx             桌面图标 + 应用图标底色块
  Dock.tsx                    底部程序坞与运行中指示
  windows/index.tsx           五个窗口的内容
lib/
  desktop.ts                  应用清单、窗口尺寸、占位文案
  data.ts                     个人资料
public/                       静态资源
.github/workflows/            Pages 部署流水线
AGENTS.md                     协作规范与硬性约束
```

图标是一套：`icon.svg` 是源，`favicon.ico` 与 `apple-icon.png` 由它栅格化而来，改图形时三份要一起换。菜单栏左侧的品牌标（`.menu-brand-mark`）用的是同一套渐变与字色，改配色时两处要同步。
