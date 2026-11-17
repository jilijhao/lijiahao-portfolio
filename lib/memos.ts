/**
 * 随笔的读写单一入口。
 *
 * 读：内容来自仓库里的 data/memos.json，构建时静态导入，
 *     所以任何设备、任何访客看到的都是同一份。
 *
 * 写：站点是纯静态的（GitHub Pages 没有后端），写入靠站主自己的
 *     GitHub Token 直接调 Contents API 提交这个 JSON，提交后 Actions 自动重建。
 *     Token 只存在站主自己的浏览器里，不随仓库发布，也不会发给任何第三方。
 *
 * 为什么不让页面直接写飞书：飞书换 user_access_token 时 client_secret 是必填的
 * （code_verifier 只是 PKCE 的补充，不能替代密钥），而 secret 一旦进浏览器就等于公开。
 * 静态站没有地方藏它，所以写入只能走 GitHub 这条自带鉴权的路。
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

const OWNER = "jilijhao";
const REPO = "lijiahao-portfolio";
const FILE_PATH = "data/memos.json";
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/** 中文要走 UTF-8 base64，否则 GitHub 上看到的是乱码。 */
function toBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  // 分段拼，避免一次性 spread 大数组爆栈
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function fromBase64(b64: string) {
  const clean = b64.replace(/\s/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function explain(status: number) {
  if (status === 401) return "Token 无效或已过期，重新生成一个";
  if (status === 403) return "Token 权限不足（需要 Contents: Read and write）";
  if (status === 404) return "仓库或文件找不到，检查 Token 有没有勾选这个仓库";
  if (status === 409) return "文件刚被改过，刷新页面再试";
  if (status === 422) return "提交被拒绝，可能 Token 没有写权限";
  return `GitHub 返回 ${status}`;
}

/** 校验 Token 是否能写这个仓库。 */
export async function verifyToken(token: string) {
  let res: Response;
  try {
    res = await fetch(API, { headers: headers(token) });
  } catch {
    throw new Error("连不上 GitHub，检查网络后重试");
  }
  if (!res.ok) throw new Error(explain(res.status));
  const data = (await res.json()) as { permissions?: { push?: boolean } };
  if (!data.permissions?.push) {
    throw new Error("这个 Token 没有写入权限（勾选 Contents: Read and write）");
  }
}

const FILE_URL = `${API}/contents/${FILE_PATH}`;

/**
 * 读仓库里此刻的真实内容。
 *
 * 页面加载的是构建时的快照，可能已经落后（比如另一台设备刚写过）。
 * 所以每次改都必须以远端为准做增量，不能拿页面里的数组整体覆盖——
 * 那会把别人刚写的东西冲掉。
 */
async function readRemote(token: string): Promise<{ memos: Memo[]; sha?: string }> {
  let res: Response;
  try {
    res = await fetch(FILE_URL, { headers: headers(token), cache: "no-store" });
  } catch {
    throw new Error("连不上 GitHub，检查网络后重试");
  }
  if (res.status === 404) return { memos: [] };
  if (!res.ok) throw new Error(explain(res.status));

  const data = (await res.json()) as { content?: string; sha?: string };
  let memos: Memo[] = [];
  if (data.content) {
    try {
      const parsed = JSON.parse(fromBase64(data.content));
      if (Array.isArray(parsed)) {
        memos = parsed.filter(
          (m): m is Memo =>
            !!m && typeof m.text === "string" && typeof m.at === "number",
        );
      }
    } catch {
      // 文件被手工改坏了也照样能继续：当作空列表重新写一份干净的
      memos = [];
    }
  }
  return { memos, sha: data.sha };
}

async function putMemos(token: string, memos: Memo[], sha?: string) {
  const body = JSON.stringify({
    message: `memo: 随笔更新（站内写入，共 ${memos.length} 条）`,
    content: toBase64(`${JSON.stringify(memos, null, 2)}\n`),
    ...(sha ? { sha } : {}),
  });

  let res: Response;
  try {
    res = await fetch(FILE_URL, {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body,
    });
  } catch {
    throw new Error("提交时连接中断，检查网络后重试");
  }
  if (!res.ok) throw new Error(explain(res.status));
}

/** 追加一条：基于远端现状追加，不会覆盖别处的改动。 */
export async function addMemo(token: string, memo: Memo) {
  const { memos, sha } = await readRemote(token);
  const next = [memo, ...memos.filter((item) => item.id !== memo.id)].sort(
    (a, b) => b.at - a.at,
  );
  await putMemos(token, next, sha);
  return next;
}

/** 删除一条：同样基于远端现状过滤。 */
export async function removeMemo(token: string, id: string) {
  const { memos, sha } = await readRemote(token);
  const next = memos.filter((item) => item.id !== id);
  await putMemos(token, next, sha);
  return next;
}

/* ============ Token 的本机存储 ============ */

const TOKEN_KEY = "desktop.gh-token.v1";
let tokenCache: string | null | undefined;
const tokenListeners = new Set<() => void>();

/** 用 useSyncExternalStore 取：服务端没有 localStorage，首屏必须与客户端一致。 */
export function readStoredToken(): string | null {
  if (tokenCache === undefined) {
    try {
      tokenCache = window.localStorage.getItem(TOKEN_KEY);
    } catch {
      tokenCache = null;
    }
  }
  return tokenCache ?? null;
}

export function tokenServerSnapshot(): string | null {
  return null;
}

export function subscribeToken(listener: () => void) {
  tokenListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== TOKEN_KEY) return;
    tokenCache = undefined;
    tokenListeners.forEach((fn) => fn());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    tokenListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setStoredToken(value: string | null) {
  tokenCache = value;
  try {
    if (value) window.localStorage.setItem(TOKEN_KEY, value);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* 无痕模式下只在本会话有效 */
  }
  tokenListeners.forEach((fn) => fn());
}

export function formatTime(at: number) {
  const d = new Date(at);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}
