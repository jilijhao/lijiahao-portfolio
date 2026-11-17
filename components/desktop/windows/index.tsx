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
import { PUBLISHED_MEMOS, formatTime } from "@/lib/memos";

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

/**
 * 随笔窗口：内容来自飞书多维表格「个人站随笔」，
 * 构建前由 scripts/sync-memos.mjs 同步成 data/memos.json。
 * 站点只读——写的地方是飞书，页面不持有任何密钥。
 */
export function MemosWindow() {
  const count = PUBLISHED_MEMOS.length;

  return (
    <div className="win-pane">
      <h2 className="win-h1">随笔</h2>
      <p className="win-p">
        短想法、踩坑记录、读到的东西。内容来自飞书多维表格，换设备打开也是同一份。
      </p>

      {count === 0 ? (
        <div className="empty-block memo-empty">
          <span className="empty-icon" aria-hidden>
            ✎
          </span>
          <h3 className="memo-empty-title">{placeholder.memosEmptyTitle}</h3>
          <p className="win-p">{placeholder.memosEmptyDesc}</p>
        </div>
      ) : (
        <div className="memo-list">
          {PUBLISHED_MEMOS.map((memo) => (
            <article key={memo.id} className="memo-item">
              <div className="memo-meta">
                <span>{formatTime(memo.at)}</span>
              </div>
              <p className="memo-text">{memo.text}</p>
            </article>
          ))}
        </div>
      )}

      <p className="memo-tip">
        共 {count} 条 · 在飞书多维表格里维护，改完自动同步到站点
      </p>
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
