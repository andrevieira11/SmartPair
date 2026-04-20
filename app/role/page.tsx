import Link from "next/link";
import { Logo } from "@/components/Logo";
import { IconArrow } from "@/components/Icon";

export default function RolePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 sm:px-8 py-4 max-w-6xl w-full mx-auto">
        <Link href="/"><Logo /></Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">Who are you today?</h1>
          <p className="mt-2 text-center text-zinc-600 dark:text-zinc-300">Pick a role to explore the demo. All data is mocked.</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <RoleCard
              href="/student"
              emoji="🎒"
              title="I'm a student"
              desc="Find a tutor, browse notes & past exams, chat in study communities, earn rewards."
              accent="bg-brand-soft"
            />
            <RoleCard
              href="/teacher"
              emoji="👩‍🏫"
              title="I'm a teacher"
              desc="Toggle your availability, accept incoming student requests, track earnings."
              accent="bg-emerald-100/60 dark:bg-emerald-500/10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function RoleCard({ href, emoji, title, desc, accent }: { href: string; emoji: string; title: string; desc: string; accent: string }) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-foreground/30 transition-colors"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${accent}`}>{emoji}</div>
      <div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{desc}</div>
      </div>
      <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand">
        Enter <IconArrow size={16} />
      </div>
    </Link>
  );
}
