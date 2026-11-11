import { FaGithub } from "react-icons/fa";
import { HiArrowRight, HiMail } from "react-icons/hi";
import { profile, stats } from "@/lib/data";

/** 首屏：定位文案 + 关键数字 Bento。 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="bg-grid absolute inset-0 -z-20 opacity-60" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-2 text-xs tracking-wider text-cyan-300 md:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {profile.role}
          </div>

          <h1 className="mt-8 text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
            {profile.headline}
            <span className="mt-3 flex flex-wrap gap-x-5 gap-y-1 bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              {profile.focusParts.map((part) => (
                <span key={part} className="whitespace-nowrap">
                  {part}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              查看项目
              <HiArrowRight />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <HiMail />
              联系我
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <FaGithub />
              GitHub
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-zinc-500">
            <span className="h-px w-10 bg-white/15" />
            {profile.location} · 欢迎交流数字化实施与 AI 应用
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className="reveal h-full"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <div
                className={
                  index === 0
                    ? "h-full rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-purple-500/10 p-6 backdrop-blur sm:p-8"
                    : "h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 sm:p-8"
                }
              >
                <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-200">
                  {item.label}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{item.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
