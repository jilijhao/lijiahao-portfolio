import { FaGraduationCap } from "react-icons/fa";
import { education, profile, strengths } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** 关于我：个人介绍 + 四项优势 Bento + 教育背景。 */
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <SectionHeading
        index="01"
        eyebrow="ABOUT"
        title="关于我"
        desc="不只是把系统做出来，更关注它有没有被业务真正用起来。"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-7 md:p-9">
            <div>
              <div className="mb-6 inline-flex rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                {profile.years}行业经验
              </div>
              <p className="text-lg leading-9 text-zinc-300 md:text-xl md:leading-10">
                从车间生产模块到电网数字化平台，一直在做同一件事：
                <span className="text-white">把业务流程拆解清楚，再用合适的工具实现它。</span>
              </p>
              <p className="mt-6 text-sm leading-8 text-zinc-400">
                熟悉低代码、RPA、BI 与 AI 智能体全技术链路，能独立承担需求分析 → 方案设计 → 开发实施 → 培训验收的完整闭环。
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-lg text-cyan-300">
                <FaGraduationCap />
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {education.school} · {education.major}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{education.period}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40">
                <div className="mb-4 text-xs font-mono text-cyan-300/70">
                  0{index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
