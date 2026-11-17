import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "李家豪 · 个人桌面",
  description:
    "李家豪的个人桌面：AI 工具开发、Agent 与教培系统实践。窗口可以拖动，从桌面图标或程序坞打开各块内容。",
  keywords: [
    "李家豪",
    "AI 工具开发",
    "Agent",
    "MCP",
    "教培系统",
    "个人站点",
  ],
  authors: [{ name: "李家豪" }],
  openGraph: {
    title: "李家豪 · 个人桌面",
    description: "把工具真正用起来。",
    type: "website",
    locale: "zh_CN",
  },
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
