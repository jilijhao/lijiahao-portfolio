#!/usr/bin/env node
/**
 * 把飞书多维表格里的随笔同步成 data/memos.json。
 * 站点始终是只读的，写的地方只有飞书。
 *
 * 两种输入方式：
 *   1) 直连飞书开放平台（GitHub Actions 用，需要自建应用凭据）
 *      env: FEISHU_APP_ID / FEISHU_APP_SECRET / FEISHU_BITABLE_TOKEN / FEISHU_TABLE_ID
 *      node scripts/sync-memos.mjs
 *
 *   2) 消费 lark-cli 导出的 NDJSON（本地或连接器定时任务用）
 *      node scripts/sync-memos.mjs --from-ndjson /tmp/memos.ndjson
 *
 * 可选字段名覆盖：FEISHU_FIELD_TEXT（默认「内容」）
 *                FEISHU_FIELD_TIME（默认「时间」）
 *                FEISHU_FIELD_PUBLISHED（默认「发布」）
 *
 * 输出约定：
 *   - 内容没变时不写文件，并打印 NO_CHANGE（定时任务可据此跳过提交）
 *   - 没有凭据时直接退出 0，保留现有文件，不会把线上随笔清空
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = path.join(ROOT, "data", "memos.json");

const FIELD_TEXT = process.env.FEISHU_FIELD_TEXT || "内容";
const FIELD_TIME = process.env.FEISHU_FIELD_TIME || "时间";
const FIELD_CREATED = process.env.FEISHU_FIELD_CREATED || "创建时间";
const FIELD_PUBLISHED = process.env.FEISHU_FIELD_PUBLISHED || "发布";

/** 同一份数据在 NDJSON（扁平）和 API（fields 嵌套）里结构不同，这里统一取。 */
function cell(record, name) {
  if (record && Object.hasOwn(record, name)) return record[name];
  return record?.fields?.[name];
}

/** 文本字段可能是字符串，也可能是富文本分段数组。 */
function asText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(asText).join("");
  if (typeof value === "object" && typeof value.text === "string") return value.text;
  return "";
}

function asTime(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value.trim().replace(" ", "T"));
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
}

function normalize(records) {
  const memos = [];
  records.forEach((record, index) => {
    // 勾掉「发布」视为草稿，不上站；字段不存在时默认发布
    if (cell(record, FIELD_PUBLISHED) === false) return;

    const text = asText(cell(record, FIELD_TEXT)).trim();
    if (!text) return;

    // 优先用手填的「时间」；没填就退回表格自动生成的「创建时间」。
    // 不能拿 Date.now() 兜底——那样每次同步结果都不同，永远不幂等。
    const at =
      asTime(cell(record, FIELD_TIME), Number.NaN) ||
      asTime(cell(record, FIELD_CREATED), Number.NaN) ||
      0;

    memos.push({
      id: record.record_id || record.id || `row-${index}`,
      text,
      at,
    });
  });
  memos.sort((a, b) => b.at - a.at);
  return memos;
}

async function fetchViaApi() {
  const { FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_BITABLE_TOKEN, FEISHU_TABLE_ID } =
    process.env;
  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET || !FEISHU_BITABLE_TOKEN || !FEISHU_TABLE_ID) {
    return null;
  }

  const authRes = await fetch(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET }),
    },
  );
  const auth = await authRes.json();
  if (auth.code !== 0) {
    throw new Error(`换取 tenant_access_token 失败：${auth.msg}（code ${auth.code}）`);
  }

  const records = [];
  let pageToken = "";
  for (let page = 0; page < 50; page += 1) {
    const url = new URL(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BITABLE_TOKEN}/tables/${FEISHU_TABLE_ID}/records`,
    );
    url.searchParams.set("page_size", "500");
    if (pageToken) url.searchParams.set("page_token", pageToken);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${auth.tenant_access_token}` },
    });
    const body = await res.json();
    if (body.code !== 0) {
      throw new Error(`读取记录失败：${body.msg}（code ${body.code}）`);
    }
    records.push(...(body.data?.items ?? []));
    if (!body.data?.has_more) break;
    pageToken = body.data?.page_token ?? "";
    if (!pageToken) break;
  }
  return records;
}

const args = process.argv.slice(2);
const ndjsonIndex = args.indexOf("--from-ndjson");

let memos;
if (ndjsonIndex !== -1) {
  const file = args[ndjsonIndex + 1];
  if (!file) throw new Error("--from-ndjson 需要文件路径");
  const lines = fs
    .readFileSync(file, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  memos = normalize(lines.map((line) => JSON.parse(line)));
} else {
  const records = await fetchViaApi();
  if (!records) {
    console.log("[memos] 未配置飞书自建应用凭据，跳过同步，保留现有 data/memos.json");
    process.exit(0);
  }
  memos = normalize(records);
}

const next = `${JSON.stringify(memos, null, 2)}\n`;
const prev = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, "utf8") : "";

if (prev === next) {
  console.log(`[memos] 无变化（${memos.length} 条）NO_CHANGE`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, next);
console.log(`[memos] 已同步 ${memos.length} 条 → data/memos.json`);
