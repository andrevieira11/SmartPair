import { TEACHER_ME, formatMoney } from "@/lib/mock";
import { IconCoin, IconStar } from "@/components/Icon";

const DAILY = [
  { d: "Mon", min: 90, cents: 3150 },
  { d: "Tue", min: 120, cents: 4200 },
  { d: "Wed", min: 75, cents: 2625 },
  { d: "Thu", min: 140, cents: 4900 },
  { d: "Fri", min: 55, cents: 1925 },
  { d: "Sat", min: 95, cents: 3325 },
  { d: "Sun", min: 65, cents: 2275 },
];

const RECENT = [
  { id: "p1", who: "Sofia L.", subject: "Math", min: 24, cents: 840, when: "Today 10:42" },
  { id: "p2", who: "Miguel F.", subject: "Math", min: 18, cents: 630, when: "Today 09:12" },
  { id: "p3", who: "Tomás R.", subject: "Physics", min: 42, cents: 1470, when: "Yesterday" },
  { id: "p4", who: "Clara T.", subject: "Math", min: 15, cents: 525, when: "Yesterday" },
  { id: "p5", who: "Rita P.", subject: "Math", min: 30, cents: 1050, when: "2 days ago" },
];

export default function EarningsPage() {
  const max = Math.max(...DAILY.map((d) => d.cents));

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">Track your classes, payouts, and student ratings.</p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="This week" value={formatMoney(TEACHER_ME.earningsThisWeekCents)} icon={<IconCoin className="text-brand" />} />
        <Stat label="This month" value={formatMoney(TEACHER_ME.earningsThisMonthCents)} icon={<IconCoin className="text-accent" />} />
        <Stat label="Avg / class" value="$6.10" icon={<IconCoin className="text-amber-500" />} />
        <Stat label="Rating" value={`${TEACHER_ME.rating} ★`} icon={<IconStar className="text-amber-500" />} />
      </section>

      <section className="rounded-2xl bg-card border border-border p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-semibold">This week</h2>
          <span className="text-xs text-zinc-500">{formatMoney(TEACHER_ME.earningsThisWeekCents)} total</span>
        </div>
        <div className="mt-4 flex items-end gap-3 h-36">
          {DAILY.map((d) => {
            const h = Math.max(6, Math.round((d.cents / max) * 100));
            return (
              <div key={d.d} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-brand-gradient" style={{ height: `${h}%` }} title={`$${(d.cents / 100).toFixed(2)}`} />
                <div className="text-[11px] text-zinc-500">{d.d}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-3">Recent payouts</h2>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border">
          {RECENT.map((r) => (
            <div key={r.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{r.who}</div>
                <div className="text-xs text-zinc-500">{r.subject} · {r.min} min · {r.when}</div>
              </div>
              <div className="text-sm font-semibold text-accent">+{formatMoney(r.cents)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500">{icon}<span>{label}</span></div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}
