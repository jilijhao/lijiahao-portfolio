import { profile } from "@/lib/data";

/** 页脚：版权与构建信息。 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-zinc-500 md:flex-row md:px-8">
        <span>© 2026 {profile.name}. 保留所有权利。</span>
        <span>
          用 Next.js 构建 · 部署于 GitHub Pages · 最后更新 2026.11
        </span>
      </div>
    </footer>
  );
}
