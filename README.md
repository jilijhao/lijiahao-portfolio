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
| 随笔 | **当前为空状态**，预留短想法 / 踩坑记录 |
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

两处数据源，按改什么选：

- **[`lib/desktop.ts`](lib/desktop.ts)** —— 窗口清单（名称、图标、渐变色、初始尺寸与错位）、Dock 顺序，以及**待替换的占位文案**（`placeholder`）。改定位、改空状态提示、加窗口都改这里。
- **[`lib/data.ts`](lib/data.ts)** —— 个人资料：姓名、邮箱、GitHub、关键数字、优势、技能分组、教育经历。

组件只负责渲染，不含硬编码业务文案。不要写手机号、薪资、求职意向等私人信息到公开仓库。

## 部署

push 到 `main` 自动触发 `.github/workflows/deploy.yml`：pnpm 安装 → `pnpm build` → 上传 `out/` → 发布 Pages。

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
