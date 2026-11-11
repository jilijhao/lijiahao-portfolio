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
  title: "李家豪 · 数字化实施开发工程师",
  description:
    "李家豪的个人站点：3 年电网与制造业数字化实施经验，专注 AI 智能体、低代码平台、RPA 自动化与 BI 数据看板，记录项目实践与工具落地。",
  keywords: [
    "李家豪",
    "数字化实施",
    "AI 智能体",
    "低代码",
    "RPA",
    "SmartBI",
    "PostgreSQL",
    "数据可视化",
  ],
  authors: [{ name: "李家豪" }],
  openGraph: {
    title: "李家豪 · 数字化实施开发工程师",
    description: "把数字化工具，真正落到业务现场。",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
