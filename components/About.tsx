export default function About() {
  const stats = [
    { value: "10+", label: "项目经验" },
    { value: "AI", label: "智能体开发" },
    { value: "RPA", label: "流程自动化" },
    { value: "BI", label: "数据分析" },
  ];

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 text-4xl font-bold">
            关于我
          </h2>

          <p className="text-lg leading-8 text-zinc-400">
            我是一名全栈开发工程师，
            长期从事企业数字化建设，
            专注 AI 智能体、
            自动化流程、
            SmartBI 数据分析、
            低代码开发平台以及现代 Web 应用开发。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-4xl font-bold">
                {item.value}
              </h3>

              <p className="mt-2 text-zinc-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}