import { FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <h2 className="mb-12 text-4xl font-bold">
        联系我
      </h2>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-6 text-zinc-400">
          欢迎交流 AI、自动化开发、全栈开发相关技术。
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/jilijhao"
            target="_blank"
            className="rounded-xl border border-white/10 px-4 py-2"
          >
            <FaGithub className="inline mr-2" />
            GitHub
          </a>

          <a
            href="mailto:your@email.com"
            className="rounded-xl border border-white/10 px-4 py-2"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}