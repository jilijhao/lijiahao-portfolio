export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">
          LiJiahao
        </h1>

        <p className="mt-6 text-xl text-zinc-400">
          AI Workflow & Full Stack Developer
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-white px-6 py-3 text-black">
            View Projects
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3">
            GitHub
          </button>
        </div>
      </section>
    </main>
  );
}