import { useState, useSyncExternalStore } from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineFolder, HiOutlineMail } from "react-icons/hi";
import {
  education,
  profile,
  skillGroups,
  stats,
  strengths,
} from "@/lib/data";
import { placeholder, type AppId } from "@/lib/desktop";
import {
  PUBLISHED_MEMOS,
  addMemo,
  formatTime,
  readStoredToken,
  removeMemo,
  setStoredToken,
  subscribeToken,
  tokenServerSnapshot,
  verifyToken,
  type Memo,
} from "@/lib/memos";

type OpenFn = (id: AppId) => void;

/** 欢迎窗口：一进来先给一句人话 + 三个去处。 */
export function WelcomeWindow({ onOpen }: { onOpen: OpenFn }) {
  return (
    <div className="win-pane">
      <div className="flex items-center gap-4">
        <span className="avatar-ring" aria-hidden>
          李
        </span>
        <div className="min-w-0">
          <h2 className="win-h1">{profile.name}</h2>
          <p className="win-sub">{placeholder.tagline}</p>
        </div>
      </div>

      <p className="win-p">{placeholder.intro}</p>

      <div className="win-actions">
        <button type="button" className="btn-pill btn-pill-primary" onClick={() => onOpen("projects")}>
          看看项目
        </button>
        <button type="button" className="btn-pill" onClick={() => onOpen("about")}>
          关于我
        </button>
        <a className="btn-pill" href={`mailto:${profile.email}`}>
          <HiOutlineMail aria-hidden /> 发邮件
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="stat-chip">
            <div className="stat-chip-value">{item.value}</div>
            <div className="stat-chip-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* 两套提示：手机上拖拽 / 双击 / Esc 都不成立，用样式按断点切换 */}
      <p className="win-hint hint-pointer">
        拖动标题栏移动窗口，双击标题栏最大化，Esc 关闭当前窗口。
      </p>
      <p className="win-hint hint-touch">
        点标题栏左侧的红点关闭窗口，用底部程序坞切换。
      </p>
    </div>
  );
}

/** 关于我：简介 + 四条能力 + 教育 + 技能标签。 */
export function AboutWindow() {
  return (
    <div className="win-pane">
      <div className="flex items-start gap-4">
        <span className="avatar-ring" aria-hidden>
          李
        </span>
        <div className="min-w-0">
          <h2 className="win-h1">{profile.name}</h2>
          <p className="win-sub">{placeholder.tagline}</p>
          <p className="win-meta">
            {education.school} · {education.major} · {education.period}
          </p>
        </div>
      </div>

      <p className="win-p">{placeholder.intro}</p>

      <h3 className="win-h3">怎么做事</h3>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {strengths.map((item) => (
          <div key={item.title} className="mini-card">
            <div className="mini-card-title">{item.title}</div>
            <p className="mini-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="win-h3">技术栈</h3>
      <div className="flex flex-col gap-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <div className="mini-card-title">{group.title}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 项目窗口：这一版先留空，只给骨架和去处。 */
export function ProjectsWindow({ onOpen }: { onOpen: OpenFn }) {
  return (
    <div className="win-pane">
      <div className="empty-block">
        <span className="empty-icon" aria-hidden>
          <HiOutlineFolder />
        </span>
        <h2 className="win-h1">{placeholder.projectsEmptyTitle}</h2>
        <p className="win-p">{placeholder.projectsEmptyDesc}</p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-3">
        {["第一个项目", "第二个项目", "第三个项目"].map((label) => (
          <div key={label} className="skeleton-card">
            <span className="skeleton-tag">待补充</span>
            <span className="skeleton-line" />
            <span className="skeleton-line short" />
            <span className="skeleton-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="win-actions">
        <button type="button" className="btn-pill btn-pill-primary" onClick={() => onOpen("contact")}>
          有项目想聊？联系我
        </button>
      </div>
    </div>
  );
}

/* ============ 随笔 ============ */

type MemoStatus = { kind: "ok" | "err" | "busy"; text: string };

/**
 * 随笔窗口：读的是构建时注入的 data/memos.json，所以任何设备看到的都是同一份。
 *
 * 写入靠站主本机的 GitHub Token 直接调 Contents API 提交这个文件，
 * 提交后 Actions 会自动重建，约 1 分钟后全站生效。
 * Token 只存在于站主自己的浏览器 localStorage，不进仓库、不发给第三方。
 */
export function MemosWindow() {
  const token = useSyncExternalStore(
    subscribeToken,
    readStoredToken,
    tokenServerSnapshot,
  );
  const [memos, setMemos] = useState<Memo[]>(PUBLISHED_MEMOS);
  const [draft, setDraft] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  // 授权面板：默认收起，点「在这台设备启用写入」才展开
  const [panel, setPanel] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<MemoStatus | null>(null);
  // 本次会话刚提交、还没等 Actions 重建完的条目
  const [fresh, setFresh] = useState<string[]>([]);

  const canWrite = Boolean(token);

  const add = async () => {
    const text = draft.trim();
    if (!text || !token || busy) return;
    const memo: Memo = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      at: Date.now(),
    };
    const rollback = memos;
    setDraft("");
    setMemos([memo, ...memos]);
    setFresh((prev) => [...prev, memo.id]);
    setBusy(true);
    setStatus({ kind: "busy", text: "正在提交到 GitHub…" });
    try {
      // 以远端返回的完整列表为准：页面加载的是构建快照，
      // 期间可能有别的设备写过，覆盖式提交会把它们冲掉
      setMemos(await addMemo(token, memo));
      setStatus({
        kind: "ok",
        text: "已提交。约 1 分钟后全站生效，其他设备也能看到。",
      });
    } catch (error) {
      setMemos(rollback);
      setDraft(text);
      setStatus({
        kind: "err",
        text: error instanceof Error ? error.message : "提交失败",
      });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!token || busy) return;
    const rollback = memos;
    setFresh((prev) => prev.filter((item) => item !== id));
    setMemos(memos.filter((item) => item.id !== id));
    setBusy(true);
    setStatus({ kind: "busy", text: "正在提交到 GitHub…" });
    try {
      setMemos(await removeMemo(token, id));
      setStatus({ kind: "ok", text: "已提交删除。约 1 分钟后全站生效。" });
    } catch (error) {
      setMemos(rollback);
      setStatus({
        kind: "err",
        text: error instanceof Error ? error.message : "删除失败",
      });
    } finally {
      setBusy(false);
    }
  };

  const saveToken = async () => {
    const value = tokenInput.trim();
    if (!value || busy) return;
    setBusy(true);
    setStatus({ kind: "busy", text: "正在校验 Token…" });
    try {
      await verifyToken(value);
      setStoredToken(value);
      setTokenInput("");
      setPanel(false);
      setStatus({ kind: "ok", text: "已保存在这台设备，现在可以写了。" });
    } catch (error) {
      setStatus({
        kind: "err",
        text: error instanceof Error ? error.message : "校验失败",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="win-pane">
      <h2 className="win-h1">随笔</h2>
      <p className="win-p">
        {canWrite
          ? "短想法、踩坑记录、读到的东西。写完直接提交到仓库，换设备打开也是同一份。"
          : "短想法、踩坑记录、读到的东西。"}
      </p>

      {canWrite ? (
        <div className="memo-compose">
          <textarea
            className="memo-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                add();
              }
            }}
            placeholder="想到什么就写一句…"
            rows={3}
            aria-label="随笔内容"
          />
          <div className="memo-bar">
            <span className="memo-count">
              {draft.trim() ? `${draft.trim().length} 字` : "⌘/Ctrl + Enter 发布"}
            </span>
            <button
              type="button"
              className="memo-send"
              onClick={add}
              disabled={!draft.trim() || busy}
            >
              {busy ? "提交中…" : "发布"}
            </button>
          </div>
        </div>
      ) : (
        // 未授权时也占住输入区的位置：让人一眼看出「这里能写」，
        // 而不是把入口缩成页脚一行小字（访客看不出差别，站主也找不到）
        !panel && (
          <button
            type="button"
            className="memo-gate"
            onClick={() => setPanel(true)}
          >
            <span className="memo-gate-icon" aria-hidden>
              ✎
            </span>
            <span>想在这里写？先在这台设备启用写入</span>
            <span className="memo-gate-arrow" aria-hidden>
              →
            </span>
          </button>
        )
      )}

      {status ? (
        <p className={`memo-status is-${status.kind}`}>{status.text}</p>
      ) : null}

      {!canWrite && panel ? (
        <div className="memo-token">
          <p className="memo-token-title">启用写入</p>
          <p className="memo-token-desc">
            站点是纯静态的，没有后端能替你保管密钥，所以写入要用你自己的
            GitHub 令牌：建一个 Fine-grained token，只勾这个仓库的{" "}
            <code>Contents: Read and write</code>，粘到下面。令牌只存在这台设备，
            不会上传，也不会进仓库。
          </p>
          <a
            className="memo-token-link"
            href="https://github.com/settings/tokens?type=beta"
            target="_blank"
            rel="noopener noreferrer"
          >
            去创建 Token ↗
          </a>
          <input
            className="memo-token-input"
            type="password"
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            placeholder="github_pat_..."
            autoComplete="off"
            spellCheck={false}
            aria-label="GitHub Token"
          />
          <div className="memo-bar">
            <button
              type="button"
              className="memo-send"
              onClick={saveToken}
              disabled={!tokenInput.trim() || busy}
            >
              {busy ? "校验中…" : "保存并校验"}
            </button>
            <button
              type="button"
              className="memo-link"
              onClick={() => setPanel(false)}
            >
              取消
            </button>
          </div>
        </div>
      ) : null}

      {memos.length === 0 ? (
        <div className="empty-block memo-empty">
          <span className="empty-icon" aria-hidden>
            ✎
          </span>
          <h3 className="memo-empty-title">{placeholder.memosEmptyTitle}</h3>
          <p className="win-p">{placeholder.memosEmptyDesc}</p>
        </div>
      ) : (
        <div className="memo-list">
          {memos.map((memo) => (
            <article key={memo.id} className="memo-item">
              <div className="memo-meta">
                <span>{formatTime(memo.at)}</span>
                {fresh.includes(memo.id) ? (
                  <span className="memo-badge">部署中</span>
                ) : null}
                {canWrite ? (
                  <button
                    type="button"
                    className="memo-del"
                    onClick={() => remove(memo.id)}
                    disabled={busy}
                    aria-label="删除这条随笔"
                  >
                    删除
                  </button>
                ) : null}
              </div>
              <p className="memo-text">{memo.text}</p>
            </article>
          ))}
        </div>
      )}

      {canWrite ? (
        <p className="memo-tip">
          共 {memos.length} 条 · 写入权限保存在这台设备 ·{" "}
          <button
            type="button"
            className="memo-link"
            onClick={() => setStoredToken(null)}
          >
            移除
          </button>
        </p>
      ) : (
        <p className="memo-tip">共 {memos.length} 条 · 只读</p>
      )}
    </div>
  );
}


/** 联系窗口：邮箱、GitHub、工作台。 */
export function ContactWindow() {
  return (
    <div className="win-pane">
      <h2 className="win-h1">发个消息</h2>
      <p className="win-p">
        聊工具、聊 Agent、聊教培场景都行。邮件我会看。
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <a className="contact-row" href={`mailto:${profile.email}`}>
          <span className="contact-icon">
            <HiOutlineMail aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="contact-label">邮箱</span>
            <span className="contact-value">{profile.email}</span>
          </span>
        </a>

        <a
          className="contact-row"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon">
            <FaGithub aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="contact-label">GitHub</span>
            <span className="contact-value">@jilijhao</span>
          </span>
        </a>

        <a
          className="contact-row"
          href="https://jilijhao.github.io/personal-workbench/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon">
            <HiOutlineExternalLink aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="contact-label">个人工作台</span>
            <span className="contact-value">记录 / 复盘 / 年终总结</span>
          </span>
        </a>
      </div>

      <p className="win-hint">{profile.location} · 远程协作也 OK</p>
    </div>
  );
}
