import { DOCK_APPS, type AppId, type WinStates } from "@/lib/desktop";
import { AppGlyph } from "./DesktopIcon";

/** 底部程序坞：打开 / 聚焦 / 从最小化恢复。运行中的图标下方有小圆点。 */
export default function Dock({
  states,
  onOpen,
}: {
  states: WinStates;
  onOpen: (id: AppId) => void;
}) {
  return (
    <nav className="dock" aria-label="程序坞">
      {DOCK_APPS.map((app) => {
        const running = states[app.id]?.open;
        return (
          <button
            key={app.id}
            type="button"
            className="dock-item"
            onClick={() => onOpen(app.id)}
            aria-label={`打开${app.name}`}
            title={`${app.name} · ${app.hint}`}
          >
            <AppGlyph app={app} size="sm" />
            <span className={`dock-dot${running ? " is-on" : ""}`} aria-hidden />
          </button>
        );
      })}
    </nav>
  );
}
