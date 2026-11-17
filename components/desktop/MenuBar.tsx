"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "@/lib/data";
import { APPS, type AppId } from "@/lib/desktop";

const MENU_ITEMS = APPS.filter((app) => !app.external).slice(0, 5);

const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function readClock(date: Date) {
  const day = `${date.getMonth() + 1}月${date.getDate()}日 ${WEEKDAYS[date.getDay()]}`;
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
  return { day, time };
}

/** 顶部菜单栏：品牌、应用菜单、实时时钟与快捷链接。 */
export default function MenuBar({ onOpen }: { onOpen: (id: AppId) => void }) {
  const [clock, setClock] = useState<{ day: string; time: string } | null>(null);

  useEffect(() => {
    const tick = () => setClock(readClock(new Date()));
    tick();
    const timer = window.setInterval(tick, 20_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="menu-bar">
      <button
        type="button"
        className="menu-brand"
        onClick={() => onOpen("about")}
        aria-label="打开关于我"
      >
        <span className="menu-brand-mark" aria-hidden>
          L
        </span>
        <span className="menu-brand-name">{profile.name}</span>
      </button>

      <nav className="menu-links" aria-label="应用菜单">
        {MENU_ITEMS.map((app) => (
          <button
            key={app.id}
            type="button"
            className="menu-item"
            onClick={() => onOpen(app.id)}
          >
            {app.name}
          </button>
        ))}
      </nav>

      <div className="menu-tail">
        <span className="menu-clock">
          {clock ? (
            <>
              <span className="menu-clock-day">{clock.day}</span>
              <span className="menu-clock-time">{clock.time}</span>
            </>
          ) : null}
        </span>

        <a
          className="menu-icon"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub />
        </a>
        <a
          className="menu-icon"
          href={`mailto:${profile.email}`}
          aria-label="发邮件"
          title="发邮件"
        >
          <HiOutlineMail />
        </a>
      </div>
    </header>
  );
}
