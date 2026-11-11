import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  desc?: string;
};

/** 各区块统一的编号 + 标题 + 说明排版。 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  desc,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-cyan-300/80">
            <span className="text-zinc-600">{index}</span>
            <span className="h-px w-8 bg-cyan-400/40" />
            {eyebrow}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        </div>
        {desc ? (
          <p className="max-w-md text-sm leading-7 text-zinc-400">{desc}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
