import {
  HiOutlineFolder,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineViewGrid,
} from "react-icons/hi";
import type { AppMeta, IconKey } from "@/lib/desktop";

const ICONS: Record<IconKey, typeof HiOutlineUser> = {
  sparkles: HiOutlineSparkles,
  user: HiOutlineUser,
  folder: HiOutlineFolder,
  pencil: HiOutlinePencilAlt,
  mail: HiOutlineMail,
  grid: HiOutlineViewGrid,
};

/** 应用图标底色块，桌面与 Dock 共用。 */
export function AppGlyph({
  app,
  size = "md",
}: {
  app: AppMeta;
  size?: "sm" | "md";
}) {
  const Icon = ICONS[app.iconKey];
  return (
    <span
      className={`app-glyph app-glyph-${size}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${app.accent[0]}, ${app.accent[1]})`,
      }}
    >
      <Icon aria-hidden />
    </span>
  );
}

/** 桌面上的一个图标：单击打开，运行中显示小圆点。 */
export default function DesktopIcon({
  app,
  onOpen,
  running,
}: {
  app: AppMeta;
  onOpen: () => void;
  running: boolean;
}) {
  return (
    <button
      type="button"
      className="desk-icon"
      onClick={onOpen}
      title={app.hint}
      aria-label={`打开${app.name}`}
    >
      <AppGlyph app={app} />
      <span className="desk-icon-label">{app.name}</span>
      {running ? <span className="desk-icon-dot" aria-hidden /> : null}
    </button>
  );
}
