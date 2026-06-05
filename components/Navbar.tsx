"use client";

import Link from "next/link";

const navItems = [
  { name: "关于我", href: "#about" },
  { name: "技术栈", href: "#skills" },
  { name: "项目经历", href: "#projects" },
  { name: "联系我", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="font-bold text-white">
          李家豪
        </h1>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}