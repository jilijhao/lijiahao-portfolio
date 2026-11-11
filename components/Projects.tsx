import { projects, type ProjectSpan } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const spanClass: Record<ProjectSpan, string> = {
  wide: "md:col-span-2",
  normal: "md:col-span-1",
  full: "md:col-span-3",
};

/** 项目经历：Bento 网格，重点案例占大卡。 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="border-y border-white/5 bg-white/[0.015] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="PROJECTS"
          title="项目经历"
          desc="低代码、数据看板、自动化与智能体，都是已经落地的真实场景。"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={(index % 3) * 0.08}
              className={`${spanClass[project.span]} h-full`}
            >
              <div
                className={
                  project.span === "full"
                    ? "flex h-full flex-col justify-between gap-6 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.08] via-white/[0.04] to-purple-500/[0.08] p-7 md:flex-row md:items-center md:p-9"
                    : "flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/40"
                }
              >
                <div className={project.span === "full" ? "md:max-w-2xl" : ""}>
                  <div className="text-xs font-medium tracking-wider text-cyan-300/80">
                    {project.category}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5 md:shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
