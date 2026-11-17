/**
 * 桌面版应用清单与占位文案。
 * 窗口尺寸、图标、初始错位都集中在这里，组件只负责渲染。
 */

export type AppId =
  | "welcome"
  | "about"
  | "projects"
  | "memos"
  | "contact"
  | "workbench";

export type IconKey =
  | "sparkles"
  | "user"
  | "folder"
  | "pencil"
  | "mail"
  | "grid";

export type AppMeta = {
  id: AppId;
  name: string;
  iconKey: IconKey;
  /** 图标与 Dock 的底色渐变（起止色，渲染时走 inline style） */
  accent: [string, string];
  /** 窗口初始尺寸与层叠错位序号 */
  window: { w: number; h: number; offset: number };
  /** 有值时点击直接跳外链，不开窗口 */
  external?: string;
  /** 图标下的副标题 / Dock 提示 */
  hint: string;
};

export const APPS: AppMeta[] = [
  {
    id: "welcome",
    name: "欢迎",
    iconKey: "sparkles",
    accent: ["#22d3ee", "#0284c7"],
    window: { w: 560, h: 430, offset: 0 },
    hint: "从这里开始",
  },
  {
    id: "about",
    name: "关于我",
    iconKey: "user",
    accent: ["#a78bfa", "#6d28d9"],
    window: { w: 620, h: 540, offset: 1 },
    hint: "经历与能力",
  },
  {
    id: "projects",
    name: "项目",
    iconKey: "folder",
    accent: ["#fcd34d", "#ea580c"],
    window: { w: 660, h: 480, offset: 2 },
    hint: "作品整理中",
  },
  {
    id: "memos",
    name: "随笔",
    iconKey: "pencil",
    accent: ["#6ee7b7", "#0d9488"],
    window: { w: 520, h: 400, offset: 3 },
    hint: "想法与记录",
  },
  {
    id: "contact",
    name: "联系",
    iconKey: "mail",
    accent: ["#f472b6", "#be123c"],
    window: { w: 470, h: 380, offset: 4 },
    hint: "发个消息",
  },
  {
    id: "workbench",
    name: "工作台",
    iconKey: "grid",
    accent: ["#cbd5e1", "#475569"],
    window: { w: 520, h: 400, offset: 5 },
    external: "https://jilijhao.github.io/personal-workbench/",
    hint: "记录与复盘",
  },
];

export const DOCK_APPS = APPS;

export type WinRect = { x: number; y: number; w: number; h: number };

/** 单个窗口的运行时状态。 */
export type WinState = WinRect & {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
};

export type WinStates = Record<AppId, WinState>;

/**
 * 占位文案：桌面壳先用这些撑起版面。
 * 新定位 / 真实项目内容定下来后，只需要替换这里的字符串。
 */
export const placeholder = {
  tagline: "AI 工具开发 · 教培机构系统",
  intro:
    "把业务问题拆成能跑起来的工具：Agent、MCP、低代码与数据看板。喜欢小而能用的系统，不喜欢为了演示而演示。",
  projectsEmptyTitle: "项目正在整理",
  projectsEmptyDesc:
    "这一版先把桌面壳搭好，项目内容随后补上。想看已经能用的东西，可以点 Dock 里的「工作台」。",
  memosEmptyTitle: "还没有随笔",
  memosEmptyDesc: "以后这里放短想法、踩坑记录和读到的东西。",
  stickyNote: {
    title: "Hi, 我是李家豪",
    line: "把工具真正用起来",
    tail: "拖动窗口 / 点 Dock 试试",
  },
};
