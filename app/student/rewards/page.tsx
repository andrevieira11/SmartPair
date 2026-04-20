import { ACHIEVEMENTS, STUDENT } from "@/lib/mock";
import { IconCoin, IconFlame, IconTrophy, IconStar } from "@/components/Icon";

export default function RewardsPage() {
  const xpPct = Math.round((STUDENT.xp / STUDENT.xpToNextLevel) * 100);
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">Show up, earn points, unlock perks.</p>
      </section>

      <section className="rounded-3xl p-6 bg-brand-gradient text-white relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs opacity-80">Your level</div>
            <div className="text-4xl font-bold">Level {STUDENT.level}</div>
            <div className="text-xs opacity-80 mt-1">{STUDENT.xp} / {STUDENT.xpToNextLevel} XP to next level</div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">
              <IconFlame size={14} /> {STUDENT.streakDays} day streak
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">
              <IconCoin size={14} /> {STUDENT.points} points
            </div>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${xpPct}%` }} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-3">Redeem points</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Redeem cost={500} title="+15 min free class" desc="Swap points for a free live tutor session." />
          <Redeem cost={1200} title="Unlock a past exam pack" desc="30 solved problems from recent exams." />
          <Redeem cost={2500} title="1 month Plus" desc="60 free daily minutes, top-rated tutors." highlight />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-3">Achievements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.id} className={`rounded-2xl border p-4 flex gap-3 items-start ${a.earned ? "bg-card border-border" : "bg-muted border-transparent opacity-70"}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${a.earned ? "bg-brand-soft" : "bg-card"}`}>
                {a.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm flex items-center gap-2">
                  {a.title}
                  {a.earned && <span className="text-[10px] bg-accent/20 text-accent rounded-full px-1.5 py-0.5">Earned</span>}
                </div>
                <div className="text-xs text-zinc-500">{a.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-3">Leaderboard — this week</h2>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border">
          {[
            { n: 1, name: "Sofia L.", pts: 2340, me: false },
            { n: 2, name: "Miguel F.", pts: 1802, me: false },
            { n: 3, name: "You (Alex)", pts: 1285, me: true },
            { n: 4, name: "Clara T.", pts: 1104, me: false },
            { n: 5, name: "Daniel R.", pts: 962, me: false },
          ].map((r) => (
            <div key={r.n} className={`flex items-center gap-3 px-4 py-3 ${r.me ? "bg-brand-soft" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${r.n === 1 ? "bg-amber-400 text-white" : r.n === 2 ? "bg-zinc-300 text-zinc-800" : r.n === 3 ? "bg-amber-700 text-white" : "bg-muted"}`}>{r.n}</div>
              <div className="flex-1 font-medium text-sm">{r.name}</div>
              <div className="text-sm inline-flex items-center gap-1"><IconStar size={14} className="text-amber-500" />{r.pts.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Redeem({ cost, title, desc, highlight }: { cost: number; title: string; desc: string; highlight?: boolean }) {
  const canAfford = STUDENT.points >= cost;
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border"}`}>
      <div className="inline-flex items-center gap-1 text-xs">
        <IconTrophy size={14} /> {cost.toLocaleString()} pts
      </div>
      <div className="mt-2 font-semibold">{title}</div>
      <div className={`mt-1 text-sm ${highlight ? "opacity-80" : "text-zinc-600 dark:text-zinc-300"}`}>{desc}</div>
      <button
        disabled={!canAfford}
        className={`mt-4 rounded-full px-4 py-2 text-sm font-medium ${
          canAfford
            ? highlight ? "bg-background text-foreground" : "bg-foreground text-background"
            : "bg-muted text-zinc-500 cursor-not-allowed"
        }`}
      >
        {canAfford ? "Redeem" : "Not enough points"}
      </button>
    </div>
  );
}
