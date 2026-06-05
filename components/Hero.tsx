"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            AI Workflow Engineer
          </div>

          <h1 className="text-6xl font-black md:text-8xl">
            李家豪
          </h1>

          <h2 className="mt-4 text-2xl text-zinc-400">
            Full Stack Developer · AI Engineer
          </h2>

          <p className="mt-8 max-w-2xl text-lg text-zinc-500">
            专注 AI 智能体、企业自动化流程、低代码平台、
            SmartBI 数据分析与现代 Web 应用开发。
          </p>

          <div className="mt-10 flex gap-4">
            <button className="group rounded-2xl bg-white px-6 py-3 text-black">
              查看项目
              <HiArrowRight className="ml-2 inline" />
            </button>

            <button className="rounded-2xl border border-white/10 px-6 py-3">
              <FaGithub className="mr-2 inline" />
              GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}