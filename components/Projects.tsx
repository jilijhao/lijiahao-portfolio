const projects = [
  {
    title: "AI 工单系统",
    desc: "结合大模型实现智能工单分析与自动流转。",
  },
  {
    title: "七巧低代码平台",
    desc: "企业级低代码开发平台与自动化流程开发。",
  },
  {
    title: "RPA 自动化项目",
    desc: "实现企业业务流程自动化与数据同步。",
  },
  {
    title: "SmartBI 数据分析",
    desc: "企业数据看板与经营分析系统。",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <h2 className="mb-12 text-4xl font-bold">
        项目经历
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="mb-4 text-2xl font-semibold">
              {project.title}
            </h3>

            <p className="text-zinc-400">
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}