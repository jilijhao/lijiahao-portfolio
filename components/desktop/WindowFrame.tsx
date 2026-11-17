"use client";

import {
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { WinRect } from "@/lib/desktop";

type WindowFrameProps = {
  title: string;
  subtitle?: string;
  rect: WinRect;
  z: number;
  maximized: boolean;
  active: boolean;
  bounds: { w: number; h: number };
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/**
 * 一个可拖拽的桌面窗口外壳。
 * 位置与尺寸通过 CSS 变量下发，移动端由样式表接管为全屏，不进 JS 分支。
 */
export default function WindowFrame({
  title,
  subtitle,
  rect,
  z,
  maximized,
  active,
  bounds,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
  children,
}: WindowFrameProps) {
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(
    null,
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    onFocus();
    if (maximized) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if ((event.target as HTMLElement).closest("[data-no-drag]")) return;

    drag.current = { px: event.clientX, py: event.clientY, x: rect.x, y: rect.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start) return;

    const maxX = Math.max(8, bounds.w - rect.w - 8);
    const maxY = Math.max(44, bounds.h - rect.h - 12);
    onMove(
      clamp(start.x + event.clientX - start.px, 8, maxX),
      clamp(start.y + event.clientY - start.py, 44, maxY),
    );
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const style = {
    "--wx": `${rect.x}px`,
    "--wy": `${rect.y}px`,
    "--ww": `${rect.w}px`,
    "--wh": `${rect.h}px`,
    zIndex: z,
  } as CSSProperties;

  return (
    <section
      className={`win-shell${maximized ? " is-max" : ""}${active ? " is-active" : ""}`}
      style={style}
      role="dialog"
      aria-label={title}
      aria-modal={false}
      onPointerDown={onFocus}
    >
      <div
        className="win-bar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={onToggleMax}
      >
        <div className="win-dots" data-no-drag>
          <button
            type="button"
            className="win-dot dot-red"
            aria-label="关闭窗口"
            onClick={onClose}
          />
          <button
            type="button"
            className="win-dot dot-yellow"
            aria-label="最小化窗口"
            onClick={onMinimize}
          />
          <button
            type="button"
            className="win-dot dot-green win-dot-max"
            aria-label={maximized ? "还原窗口" : "最大化窗口"}
            onClick={onToggleMax}
          />
        </div>

        <div className="win-title">
          <span className="win-title-main">{title}</span>
          {subtitle ? <span className="win-title-sub">{subtitle}</span> : null}
        </div>

        <div className="win-bar-tail" />
      </div>

      <div className="win-body">{children}</div>
    </section>
  );
}
