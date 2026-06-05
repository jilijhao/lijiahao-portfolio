"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const tags = [
  "AI Agent",
  "RPA",
  "SmartBI",
  "Next.js",
  "Java",
  "Python",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            AI Workflow Engineer
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight md:text-8xl">
            构建 AI 驱动的
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              企业数字化解决方案
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            专注 AI 智能体、企业自动化流程、
            RPA、低代码平台与现代 Web 应用开发，
            打造高性能、高体验的企业级应用。
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-white px-6 py-3 text-black">
              查看项目
              <HiArrowRight className="ml-2 inline" />
            </button>

            <a
              href="https://github.com/jilijhao"
              target="_blank"
              className="rounded-2xl border border-white/10 px-6 py-3"
            >
              <FaGithub className="mr-2 inline" />
              GitHub
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition hover:-translate-y-2 hover:border-cyan-500/50"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}