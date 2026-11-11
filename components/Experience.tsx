import { experiences } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** 工作经历：按时间倒序的时间线卡片。 */
export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <SectionHeading
        index="03"
        eyebrow="EXPERIENCE"
        title="工作经历"
        desc="从制造业数字工厂到电网数字化平台，一直在项目一线。"
      />

      <div className="space-y-4">
        {experiences.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.1}>
            <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-400/30 md:grid-cols-[190px_1fr] md:gap-8 md:p-8">
              <div className="flex flex-row items-start gap-3 md:flex-col md:gap-2">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400 ring-4 ring-cyan-400/15" />
                <div>
                  <div className="font-mono text-xs tracking-wide text-cyan-300">
                    {item.period}
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">全职</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                <div className="mt-1 text-sm text-cyan-300/90">{item.role}</div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{item.summary}</p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-sm leading-7 text-zinc-400"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
