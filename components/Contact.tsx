import { FaGithub } from "react-icons/fa";
import { HiArrowRight, HiMail } from "react-icons/hi";
import { profile } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** 联系方式：只放愿意公开的两个入口。 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <SectionHeading
        index="05"
        eyebrow="CONTACT"
        title="联系我"
        desc="聊聊数字化实施、AI 智能体，或者一个还没想清楚的业务问题。"
      />

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-cyan-400/[0.06] p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              有想法？直接发邮件就行。
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
              欢迎交流低代码平台落地、RPA / AI 智能体场景、BI 看板指标设计，也欢迎一起做点有意思的开源项目。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                <HiMail />
                {profile.email}
                <HiArrowRight />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <FaGithub />
                github.com/jilijhao
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
