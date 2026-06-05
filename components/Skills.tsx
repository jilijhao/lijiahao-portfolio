const skills = [
  "Java",
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "MySQL",
  "RPA",
  "SmartBI",
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-32">
      <h2 className="mb-12 text-4xl font-bold">
        技术栈
      </h2>

      <div className="grid gap-4 md:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}