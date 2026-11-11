import type { IconType } from "react-icons";
import { FaCode, FaDatabase, FaLayerGroup, FaRobot } from "react-icons/fa";
import { skillGroups } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const icons: IconType[] = [FaLayerGroup, FaRobot, FaDatabase, FaCode];

/** 技术栈：按能力域分组的 Bento 卡片。 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-white/5 bg-white/[0.015] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="SKILLS"
          title="技术栈"
          desc="工具服务于场景，按「能解决什么问题」来组织能力。"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={group.title} delay={index * 0.08} className="h-full">
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {group.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-500">{group.desc}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-lg text-cyan-300 transition group-hover:bg-cyan-400/20">
                      <Icon />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
