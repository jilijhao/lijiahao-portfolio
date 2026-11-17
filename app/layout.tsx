import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 站点根地址，用于把 OG / 图标的相对路径补成绝对地址。 */
const SITE_URL = "https://jilijhao.github.io/lijiahao-portfolio/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 标题刻意保持简短：标签页宽度有限，过长会被截断成「李家豪 · 个人」这种半截话
  title: {
    default: "李家豪 · 桌面",
    template: "%s · 李家豪",
  },
  description:
    "李家豪的个人桌面：AI 工具开发、Agent 与教培系统实践。窗口可以拖动，从桌面图标或程序坞打开各块内容。",
  keywords: ["李家豪", "AI 工具开发", "Agent", "MCP", "教培系统", "个人站点"],
  authors: [{ name: "李家豪" }],
  creator: "李家豪",
  applicationName: "李家豪 · 桌面",
  openGraph: {
    title: "李家豪 · 桌面",
    description: "AI 工具开发、Agent 与教培系统实践。把工具真正用起来。",
    type: "website",
    locale: "zh_CN",
    siteName: "李家豪 · 桌面",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "李家豪 · 桌面",
    description: "AI 工具开发、Agent 与教培系统实践。把工具真正用起来。",
  },
  // 必须显式声明：只靠 app/ 文件约定时 Next 仅注入 icon.svg，
  // 而 Safari 不支持 SVG favicon，会退回去请求域名根目录的 /favicon.ico ——
  // 站点在 /lijiahao-portfolio/ 子路径下，那个请求必然 404。
  // 这里用相对路径，由 metadataBase 补成绝对地址，避免 basePath 被漏掉。
  icons: {
    icon: [
      { url: "favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050914",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
