import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * 滚动淡入容器：动效由 globals.css 的 .reveal 提供。
 * 用 CSS 而非 JS 动画，保证无脚本 / 动画被阻断时内容依然可见。
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined;

  return (
    <div className={`reveal ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}
