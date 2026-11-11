"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { profile } from "@/lib/data";

const navItems = [
  { name: "关于我", href: "#about" },
  { name: "技术栈", href: "#skills" },
  { name: "工作经历", href: "#experience" },
  { name: "项目经历", href: "#projects" },
  { name: "联系我", href: "#contact" },
];

/** 顶部固定导航：桌面横排，移动端折叠为下拉菜单。 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090b]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 text-sm font-bold text-black">
            李
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-zinc-400 transition hover:text-cyan-300"
            >
              {item.name}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/15 px-4 py-1.5 text-sm text-white transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            GitHub ↗
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-xl text-white md:hidden"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#09090b]/98 px-5 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-sm text-zinc-300 last:border-0"
            >
              {item.name}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block py-2 text-sm text-cyan-300"
          >
            GitHub ↗
          </a>
        </nav>
      ) : null}
    </header>
  );
}
