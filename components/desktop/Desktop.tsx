"use client";

import { useCallback, useEffect, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import Dock from "./Dock";
import MenuBar from "./MenuBar";
import WindowFrame from "./WindowFrame";
import {
  AboutWindow,
  ContactWindow,
  MemosWindow,
  ProjectsWindow,
  WelcomeWindow,
} from "./windows";
import {
  APPS,
  placeholder,
  type AppId,
  type AppMeta,
  type WinRect,
  type WinStates,
} from "@/lib/desktop";

const BASE = { w: 1280, h: 800 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/** 按视口算一个窗口的初始矩形：居中偏右，给左侧图标列留位置。 */
function rectFor(app: AppMeta, vw: number, vh: number): WinRect {
  const w = Math.min(app.window.w, Math.max(300, vw - 32));
  const h = Math.min(app.window.h, Math.max(240, vh - 148));
  const offset = app.window.offset * 26;
  return {
    w,
    h,
    x: clamp(Math.round(vw * 0.5 - w / 2) + 34 + offset, 116, Math.max(116, vw - w - 16)),
    y: clamp(Math.round(vh * 0.5 - h / 2) - 16 + offset, 56, Math.max(56, vh - h - 104)),
  };
}

function createStates(vw: number, vh: number): WinStates {
  const next = {} as WinStates;
  APPS.forEach((app, index) => {
    next[app.id] = {
      open: app.id === "welcome",
      minimized: false,
      maximized: false,
      z: index + 1,
      ...rectFor(app, vw, vh),
    };
  });
  return next;
}

function windowBody(id: AppId, onOpen: (id: AppId) => void) {
  switch (id) {
    case "welcome":
      return <WelcomeWindow onOpen={onOpen} />;
    case "about":
      return <AboutWindow />;
    case "projects":
      return <ProjectsWindow onOpen={onOpen} />;
    case "memos":
      return <MemosWindow />;
    case "contact":
      return <ContactWindow />;
    default:
      return null;
  }
}

/** 桌面壳：壁纸、菜单栏、图标列、窗口层、便签与程序坞。 */
export default function Desktop() {
  const [states, setStates] = useState<WinStates>(() =>
    createStates(BASE.w, BASE.h),
  );
  const [bounds, setBounds] = useState(BASE);
  const [activeId, setActiveId] = useState<AppId>("welcome");

  // 关掉或最小化当前窗口后，激活态要落到剩下最高的一层。
  // 移动端只呈现激活窗口，没有这层兜底会出现「一个窗口都不显示」。
  const visibleTop = APPS.filter(
    (app) => states[app.id].open && !states[app.id].minimized,
  ).sort((a, b) => states[b.id].z - states[a.id].z)[0]?.id;
  const activeWindow =
    states[activeId].open && !states[activeId].minimized ? activeId : visibleTop;

  const openApp = useCallback((id: AppId) => {
    const app = APPS.find((item) => item.id === id);
    if (!app) return;

    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveId(id);
    setStates((prev) => {
      const topZ = Math.max(...APPS.map((item) => prev[item.id].z));
      return {
        ...prev,
        [id]: { ...prev[id], open: true, minimized: false, z: topZ + 1 },
      };
    });
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setActiveId(id);
    setStates((prev) => {
      const topZ = Math.max(...APPS.map((item) => prev[item.id].z));
      return { ...prev, [id]: { ...prev[id], z: topZ + 1 } };
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, maximized: false },
    }));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }));
  }, []);

  const toggleMax = useCallback((id: AppId) => {
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized },
    }));
  }, []);

  const moveApp = useCallback((id: AppId, x: number, y: number) => {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], x, y } }));
  }, []);

  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setBounds({ w: vw, h: vh });
      setStates((prev) => {
        const next = { ...prev };
        APPS.forEach((app) => {
          const state = next[app.id];
          const fit = rectFor(app, vw, vh);
          if (!state.open) {
            next[app.id] = { ...state, ...fit };
            return;
          }
          // 已打开的窗口也必须重新收一次宽高：只钳位置的话，
          // 桌面切到手机横屏（高度骤减）时窗口会比视口还高，底部直接跑出屏幕。
          const w = Math.min(state.w, fit.w);
          const h = Math.min(state.h, fit.h);
          next[app.id] = {
            ...state,
            w,
            h,
            x: clamp(state.x, 8, Math.max(8, vw - w - 8)),
            y: clamp(state.y, 44, Math.max(44, vh - h - 12)),
          };
        });
        return next;
      });
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const top = APPS.filter(
        (app) => states[app.id].open && !states[app.id].minimized,
      ).sort((a, b) => states[b.id].z - states[a.id].z)[0];
      if (top) closeApp(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [states, closeApp]);

  return (
    <div className="desktop">
      <div className="wallpaper" aria-hidden>
        <div className="wallpaper-grid" />
        <div className="wallpaper-horizon" />
      </div>

      <MenuBar onOpen={openApp} />

      <div className="desk-icons">
        {APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            running={states[app.id].open}
            onOpen={() => openApp(app.id)}
          />
        ))}
      </div>

      {APPS.filter((app) => !app.external).map((app) => {
        const state = states[app.id];
        if (!state.open || state.minimized) return null;
        return (
          <WindowFrame
            key={app.id}
            title={app.name}
            subtitle={app.hint}
            rect={{ x: state.x, y: state.y, w: state.w, h: state.h }}
            z={state.z}
            maximized={state.maximized}
            active={activeWindow === app.id}
            bounds={bounds}
            onFocus={() => focusApp(app.id)}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onToggleMax={() => toggleMax(app.id)}
            onMove={(x, y) => moveApp(app.id, x, y)}
          >
            {windowBody(app.id, openApp)}
          </WindowFrame>
        );
      })}

      <aside className="sticky-note" aria-hidden>
        <span className="sticky-tape" />
        <span className="sticky-title">{placeholder.stickyNote.title}</span>
        <span className="sticky-line">{placeholder.stickyNote.line}</span>
        <span className="sticky-tail">{placeholder.stickyNote.tail}</span>
      </aside>

      <Dock states={states} onOpen={openApp} />
    </div>
  );
}
