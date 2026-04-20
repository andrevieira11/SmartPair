import Link from "next/link";
import { Logo } from "@/components/Logo";
import { IconBolt, IconBook, IconChat, IconTrophy, IconVideo, IconArrow, IconSparkles, IconStar } from "@/components/Icon";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-5 sm:px-8 py-4 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Logo />
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#how" className="text-zinc-600 hover:text-foreground dark:text-zinc-300">How it works</a>
          <a href="#plans" className="text-zinc-600 hover:text-foreground dark:text-zinc-300">Plans</a>
          <Link href="/role" className="rounded-full bg-foreground text-background px-4 py-2 font-medium">Open the app</Link>
        </nav>
        <Link href="/role" className="sm:hidden rounded-full bg-foreground text-background px-3 py-1.5 text-sm font-medium">Open</Link>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-soft pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pt-20 sm:pb-24 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/10 border border-border px-3 py-1 text-xs">
              <IconSparkles size={14} className="text-brand" />
              A tutor on demand, in under a minute
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
              Stuck on a problem?<br />
              <span className="bg-brand-gradient bg-clip-text text-transparent">Tap. Match. Learn.</span>
            </h1>
            <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-300 max-w-lg">
              SmartPair connects students with real tutors for live 1:1 video classes. Pay by the minute, or unlock free daily lessons with a plan.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/role?role=student"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-medium"
              >
                I&apos;m a student <IconArrow size={18} />
              </Link>
              <Link
                href="/role?role=teacher"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium"
              >
                I want to teach
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1"><IconStar size={16} className="text-amber-500" /> 4.9 · 3.1k reviews</div>
              <div>•</div>
              <div>Works on phone, tablet &amp; web</div>
            </div>
          </div>
          <HeroPhone />
        </div>
      </section>

      {/* Value props */}
      <section id="how" className="max-w-6xl mx-auto w-full px-5 sm:px-8 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything to pass your next exam</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-2xl">Live classes are the core. Around them, a full learning loop: notes, practice, community and rewards that keep students coming back.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature icon={<IconVideo />} title="Live in under a minute" desc="Tap 'Find a tutor' and we match you with an available teacher. Most classes start in less than 60 seconds." />
          <Feature icon={<IconBolt />} title="Pay per minute" desc="No long commitments. Pay for what you actually use, from a few cents per minute." />
          <Feature icon={<IconBook />} title="Notes, exams &amp; drills" desc="A curated library with past national exams, cheat sheets and themed exercise sets." />
          <Feature icon={<IconChat />} title="Study communities" desc="Subject-based chats with students and tutors. Get unstuck even between classes." />
          <Feature icon={<IconTrophy />} title="Rewards that motivate" desc="Earn points, keep streaks, and unlock achievements as you study. Redeem for free minutes." />
          <Feature icon={<IconSparkles />} title="Smart matching" desc="We pair you by subject, level and teaching style — not just whoever is online." />
          <Feature icon={<IconStar />} title="Top-rated tutors" desc="All tutors are 18+, verified and rated after every class. Only the best stick around." />
          <Feature icon={<IconArrow />} title="Works everywhere" desc="Phone, tablet, or web — same experience, same login, installable like an app." />
        </div>
      </section>

      {/* Plans preview */}
      <section id="plans" className="bg-muted">
        <div className="max-w-6xl mx-auto w-full px-5 sm:px-8 py-14 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Plans that scale with exam season</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">Start free, upgrade before your finals. Cancel anytime.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <PlanCard name="Free" price="$0" tag="Always free" perks={["15 free minutes / day", "Notes & past exams", "Community chats"]} />
            <PlanCard name="Plus" price="$9.9" tag="Most popular" highlight perks={["60 free minutes / day", "Priority matching (<30s)", "Double rewards points"]} />
            <PlanCard name="Pro" price="$19.9" tag="For exam weeks" perks={["3h of free classes / day", "Instant match, top tutors", "Unlimited during exams"]} />
          </div>
          <div className="mt-8">
            <Link href="/role" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium">
              Try it now (mock demo) <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto w-full px-5 sm:px-8 py-8 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3"><Logo size={22} /> <span>© 2026 · Demo prototype</span></div>
        <div className="flex items-center gap-5">
          <span>All data is mocked for demo.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-brand mb-4">{icon}</div>
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{desc}</div>
    </div>
  );
}

function PlanCard({ name, price, tag, perks, highlight }: { name: string; price: string; tag: string; perks: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 border ${highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border"}`}>
      <div className="flex items-center justify-between text-sm">
        <span className={highlight ? "opacity-80" : "text-zinc-500"}>{name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${highlight ? "bg-background/20" : "bg-muted"}`}>{tag}</span>
      </div>
      <div className="mt-2 text-3xl font-bold">{price}<span className={`text-base font-medium ${highlight ? "opacity-70" : "text-zinc-500"}`}>/mo</span></div>
      <ul className="mt-5 space-y-2 text-sm">
        {perks.map((p) => (
          <li key={p} className="flex gap-2"><span className={highlight ? "text-accent" : "text-brand"}>●</span>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function HeroPhone() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative aspect-[9/18] rounded-[2.5rem] bg-zinc-900 border-[10px] border-zinc-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-2xl mx-auto w-32 z-10" />
        <div className="absolute inset-0 bg-brand-gradient">
          <div className="h-full w-full p-5 pt-10 flex flex-col text-white">
            <div className="text-xs opacity-80">Matching a tutor…</div>
            <div className="mt-1 text-2xl font-bold">Math · Derivatives</div>

            <div className="mt-10 flex-1 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-white/30 pulse-ring" />
                <span className="absolute inset-0 rounded-full bg-white/20 pulse-ring" style={{ animationDelay: "0.4s" }} />
                <span className="absolute inset-0 rounded-full bg-white/10 pulse-ring" style={{ animationDelay: "0.8s" }} />
                <div className="relative w-28 h-28 rounded-full bg-white/20 backdrop-blur flex items-center justify-center ring-4 ring-white/30">
                  <span className="text-4xl">🎓</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
              <div className="text-xs opacity-80">Avg wait today</div>
              <div className="text-lg font-semibold">28 seconds</div>
              <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white w-2/3 rounded-full" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] opacity-80">
                <span>Ana M. joining…</span><span>4.9 ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
