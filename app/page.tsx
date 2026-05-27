"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";


export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      {/* 背景光效 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
            AI Workflow Engineer
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Build Modern
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              AI Experiences
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            专注 AI 自动化、RPA、企业流程系统与现代 Web 开发，
            打造高性能、高体验的智能化应用系统。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition-all hover:scale-105">
              查看项目
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium backdrop-blur transition-all hover:bg-white/10">
              <FaGithub className="h-4 w-4" />
              GitHub
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}