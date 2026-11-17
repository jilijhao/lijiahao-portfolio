/**
 * 随笔数据的读取入口。
 *
 * 内容源是飞书多维表格「个人站随笔」，由 scripts/sync-memos.mjs 在构建前
 * 同步成 data/memos.json，这里只做静态导入。
 *
 * 站点本身不提供写入能力：多维表格的 API 需要 app_secret 换 token，
 * 密钥不能进浏览器，所以写入只发生在飞书里。
 */

import rawMemos from "@/data/memos.json";

export type Memo = {
  id: string;
  text: string;
  at: number;
};

/** 构建时注入的随笔，按时间倒序。 */
export const PUBLISHED_MEMOS: Memo[] = (rawMemos as Memo[])
  .filter(
    (memo) =>
      !!memo && typeof memo.text === "string" && typeof memo.at === "number",
  )
  .sort((a, b) => b.at - a.at);

export function formatTime(at: number) {
  const d = new Date(at);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}
