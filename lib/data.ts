/**
 * 站点全部文案的单一数据源。
 * 更新个人内容时只改本文件，组件不需要动。
 * 注意：不要把手机号、薪资、求职意向等私人信息写进公开站点。
 */

export const profile = {
  name: "李家豪",
  role: "数字化实施开发工程师",
  focusParts: ["AI 智能体", "低代码", "数据可视化"],
  headline: "把数字化工具，真正落到业务现场",
  intro:
    "3 年电网与制造业数字化实施经验，覆盖需求分析、方案设计、开发实施到交付验收全流程。用低代码、RPA、BI 看板与 AI 智能体，把业务问题变成能跑起来的系统。",
  location: "云南 · 保山",
  email: "2661247098@qq.com",
  github: "https://github.com/jilijhao",
  years: "3 年",
};

export const stats = [
  { value: "3 年", label: "行业实施经验", hint: "电网 · 制造业" },
  { value: "50+", label: "低代码应用", hint: "七巧 · 彩云易创" },
  { value: "20+", label: "RPA 机器人", hint: "UiBot 自动化" },
  { value: "10+", label: "AI 智能体", hint: "场景策划到落地" },
];

export const strengths = [
  {
    title: "全链路交付",
    desc: "从需求调研、方案设计到开发、培训与验收，能独立跑完一个项目周期。",
  },
  {
    title: "平台化建设",
    desc: "熟悉低代码、RPA 与大数据平台，擅长让业务人员也能自主搭建工具。",
  },
  {
    title: "数据驱动",
    desc: "PostgreSQL 建模 + BI 报表，把分散的凭证数据变成可钻取的经营看板。",
  },
  {
    title: "AI 场景落地",
    desc: "从需求策划到部署推广，把智能体嵌进真实业务流程而不是停在演示。",
  },
];

export const education = {
  school: "昆明理工大学津桥学院",
  major: "计算机科学与技术",
  period: "2020 — 2024",
};

export const skillGroups = [
  {
    title: "低代码与流程",
    desc: "需求分析、表单与报表设计、工作流编排",
    items: ["七巧", "彩云易创", "工作流", "表单 / 报表", "需求调研 → 验收"],
  },
  {
    title: "自动化与 AI",
    desc: "机器人流程自动化与智能体应用建设",
    items: ["UiBot / RPA", "AI 智能体", "Agent 开发", "MCP", "场景策划"],
  },
  {
    title: "数据与 BI",
    desc: "数据建模、指标口径与可视化看板",
    items: ["PostgreSQL", "SQL 建模", "SmartBI", "帆软报表", "大数据可视化"],
  },
  {
    title: "开发与工程",
    desc: "日常开发、前端实现与系统运维",
    items: ["Java", "Python", "TypeScript", "React / Next.js", "Git"],
  },
];

export const experiences = [
  {
    company: "云南睿蒙科技有限公司",
    role: "实施工程师 · 数字化项目技术支持",
    period: "2025.01 — 至今",
    summary: "驻场电网行业数字化项目，负责需求对接、方案设计、平台实施与交付验收。",
    highlights: [
      "落地 4 项 RPA、4 项低代码、3 项 AI 应用、4 个大数据可视化与 3 个数据产品",
      "主导绩效得分驾驶舱及指标 / 任务月度跟踪表，打通工作流与群消息推送",
      "承担数字化竞赛保障，完成 5 次赛前指导与竞赛方案、平台搭建",
    ],
  },
  {
    company: "云南羽成科技有限公司",
    role: "运维开发工程师",
    period: "2023.09 — 2025.01",
    summary: "参与云天化股份数字工厂管理平台实施，覆盖三家分子公司的生产模块。",
    highlights: [
      "负责需求收集、流程配置、个性化表单开发与帆软报表配置",
      "承担前端优化、数据库维护及上线后的运维保障",
      "按调研 → 配置 → 开发 → 测试 → 培训上线流程推进，完成三家工厂交付验收",
    ],
  },
];

export type ProjectSpan = "wide" | "normal" | "full";

export const projects: {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  span: ProjectSpan;
}[] = [
  {
    title: "绩效得分驾驶舱",
    category: "低代码 · 指标体系",
    desc: "基于低代码平台搭建 120 分制绩效体系（指标 84 分 + 任务 36 分），采用首页 → 二级指标 → 叶子详情三层钻取，并接上工作流发起与群消息推送。",
    tags: ["七巧", "三层钻取", "工作流"],
    span: "wide",
  },
  {
    title: "财务预算分析看板",
    category: "数据 · BI",
    desc: "PostgreSQL 建模 + BI 报表，覆盖 4 个县级单位的办公费、差旅费执行进度，用「预算进度 vs 时间进度」偏差识别执行状态。",
    tags: ["PostgreSQL", "SmartBI", "指标口径"],
    span: "normal",
  },
  {
    title: "证书管理系统",
    category: "低代码 · 业务应用",
    desc: "数据过滤、多表关联、报表输出、流程设计与证书到期自动提醒，已在全省范围推广使用。",
    tags: ["彩云易创", "自动化任务"],
    span: "normal",
  },
  {
    title: "数字工厂管理平台",
    category: "实施 · 制造业",
    desc: "三家工厂生产模块实施：流程配置、个性化表单、帆软报表、前端优化与上线运维。",
    tags: ["需求调研", "表单 / 报表"],
    span: "normal",
  },
  {
    title: "RPA 自动化机器人",
    category: "自动化",
    desc: "基于 UiBot 搭建 20+ 机器人，覆盖业务流程自动化与跨系统数据同步。",
    tags: ["UiBot", "数据同步"],
    span: "normal",
  },
  {
    title: "AI 智能体应用",
    category: "AI · 场景落地",
    desc: "从需求策划、方案设计到开发部署与推广，累计交付 10+ 智能体应用；同时把智能体能力延伸到个人项目与开发工作流中。",
    tags: ["AI Agent", "需求分析", "部署推广"],
    span: "full",
  },
];
