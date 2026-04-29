"use client";

import { useEffect, useState } from "react";
import {
  TEACHER_ME,
  formatMoney,
  loadRecentPayouts,
  clearRecentPayouts,
  SMARTPAIR_COMMISSION_PCT,
  type StoredPayout,
} from "@/lib/mock";
import { Avatar } from "@/components/Avatar";
import { IconCoin, IconStar, IconSparkles } from "@/components/Icon";

const DAILY = [
  { d: "Mon", min: 90, cents: 3150 },
  { d: "Tue", min: 120, cents: 4200 },
  { d: "Wed", min: 75, cents: 2625 },
  { d: "Thu", min: 140, cents: 4900 },
  { d: "Fri", min: 55, cents: 1925 },
  { d: "Sat", min: 95, cents: 3325 },
  { d: "Sun", min: 65, cents: 2275 },
];

// `cents` = gross. Net derived via SMARTPAIR_COMMISSION_PCT.
const RECENT = [
  { id: "p1", who: "Sofia L.", subject: "Math", min: 24, cents: 840, when: "Today 10:42" },
  { id: "p2", who: "Miguel F.", subject: "Math", min: 18, cents: 630, when: "Today 09:12" },
  { id: "p3", who: "Tomás R.", subject: "Physics", min: 42, cents: 1470, when: "Yesterday" },
  { id: "p4", who: "Clara T.", subject: "Math", min: 15, cents: 525, when: "Yesterday" },
  { id: "p5", who: "Rita P.", subject: "Math", min: 30, cents: 1050, when: "2 days ago" },
];

// Treat mock weekly/monthly values as GROSS. Derive net + commission.
function split(grossCents: number) {
  const commissionCents = Math.round(grossCents * SMARTPAIR_COMMISSION_PCT);
  return { grossCents, commissionCents, netCents: grossCents - commissionCents };
}

export default function EarningsPage() {
  const max = Math.max(...DAILY.map((d) => d.cents));
  const [demoPayouts, setDemoPayouts] = useState<StoredPayout[]>([]);

  useEffect(() => {
    setDemoPayouts(loadRecentPayouts());
  }, []);

  const demoNetTotal = demoPayouts.reduce((sum, p) => sum + p.netCents, 0);
  const demoGrossTotal = demoPayouts.reduce((sum, p) => sum + p.grossCents, 0);
  const demoCommissionTotal = demoPayouts.reduce((sum, p) => sum + p.commissionCents, 0);

  const week = split(TEACHER_ME.earningsThisWeekCents);
  const month = split(TEACHER_ME.earningsThisMonthCents);
  const commissionPctLabel = `${(SMARTPAIR_COMMISSION_PCT * 100).toFixed(0)}%`;

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">Track classes, payouts, and student ratings.</p>
      </section>

      {/* Commission breakdown — this week */}
      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-xs text-zinc-500">Net payout · this week</div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight">{formatMoney(week.netCents)}</div>
          </div>
          <span className="rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] px-2.5 py-1 font-medium">
            SmartPair commission {commissionPctLabel}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <Bar label="Gross" cents={week.grossCents} tone="brand" />
          <Bar label={`Commission ${commissionPctLabel}`} cents={week.commissionCents} tone="warn" minus />
          <Bar label="Your net" cents={week.netCents} tone="accent" highlight />
        </div>
        <CommissionBar gross={week.grossCents} net={week.netCents} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Net this month" value={formatMoney(month.netCents)} icon={<IconCoin className="text-accent" />} sub={`Gross ${formatMoney(month.grossCents)}`} />
        <Stat label={`Commission ${commissionPctLabel} · month`} value={`−${formatMoney(month.commissionCents)}`} icon={<IconCoin className="text-amber-500" />} />
        <Stat label="Avg / class (net)" value="€3.97" icon={<IconCoin className="text-brand" />} sub="gross €6.10" />
        <Stat label="Rating" value={`${TEACHER_ME.rating} ★`} icon={<IconStar className="text-amber-500" />} />
      </section>

      {/* Live demo payouts panel */}
      {demoPayouts.length > 0 && (
        <section className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-5 bg-brand-soft flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand shrink-0">
              <IconSparkles />
            </div>
            <div className="flex-1">
              <div className="font-semibold inline-flex items-center gap-2">
                Demo payouts (last 24h)
                <span className="text-[10px] bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full px-2 py-0.5">DEMO</span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Saved on this device. Net <b>€{(demoNetTotal / 100).toFixed(2)}</b> · Gross €{(demoGrossTotal / 100).toFixed(2)} · Commission €{(demoCommissionTotal / 100).toFixed(2)}
              </div>
            </div>
            <button
              onClick={() => {
                clearRecentPayouts();
                setDemoPayouts([]);
              }}
              className="text-xs text-zinc-500 hover:text-foreground underline shrink-0"
            >
              Clear
            </button>
          </div>
          <div className="divide-y divide-border">
            {demoPayouts.map((p) => (
              <DemoRow key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

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
                <div className="w-full rounded-t-md bg-brand-gradient" style={{ height: `${h}%` }} title={`€${(d.cents / 100).toFixed(2)}`} />
                <div className="text-[11px] text-zinc-500">{d.d}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold tracking-tight">Recent payouts</h2>
          <span className="text-[11px] text-zinc-500">net shown · gross & commission below</span>
        </div>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border">
          {RECENT.map((r) => {
            const s = split(r.cents);
            return (
              <div key={r.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{r.who}</div>
                  <div className="text-xs text-zinc-500">{r.subject} · {r.min} min · {r.when}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-accent">+{formatMoney(s.netCents)}</div>
                  <div className="text-[10px] text-zinc-500">
                    gross {formatMoney(s.grossCents)} − {formatMoney(s.commissionCents)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-[11px] text-zinc-500 text-center">
        SmartPair commission: {commissionPctLabel} of gross. Payouts settle weekly.
      </p>
    </div>
  );
}

function Stat({ label, value, icon, sub }: { label: string; value: string; icon: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500">{icon}<span className="truncate">{label}</span></div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      {sub && <div className="text-[11px] text-zinc-500">{sub}</div>}
    </div>
  );
}

function Bar({
  label,
  cents,
  tone,
  highlight,
  minus,
}: {
  label: string;
  cents: number;
  tone: "brand" | "warn" | "accent";
  highlight?: boolean;
  minus?: boolean;
}) {
  const dotClass =
    tone === "brand" ? "bg-brand" : tone === "warn" ? "bg-amber-500" : "bg-accent";
  return (
    <div className={`rounded-xl border p-3 ${highlight ? "bg-accent/5 border-accent/30" : "bg-muted border-border"}`}>
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
        <span className="truncate">{label}</span>
      </div>
      <div className={`mt-1 text-base font-semibold tabular-nums ${highlight ? "text-accent" : ""}`}>
        {minus ? "−" : ""}€{(cents / 100).toFixed(2)}
      </div>
    </div>
  );
}

/** Stacked bar visualizing gross split into net + commission. */
function CommissionBar({ gross, net }: { gross: number; net: number }) {
  if (gross <= 0) return null;
  const netPct = Math.round((net / gross) * 100);
  const comPct = 100 - netPct;
  return (
    <div className="mt-4">
      <div className="h-3 w-full rounded-full overflow-hidden flex bg-muted">
        <div className="bg-accent" style={{ width: `${netPct}%` }} title={`Net ${netPct}%`} />
        <div className="bg-amber-500" style={{ width: `${comPct}%` }} title={`Commission ${comPct}%`} />
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-zinc-500">
        <span>You keep {netPct}%</span>
        <span>SmartPair {comPct}%</span>
      </div>
    </div>
  );
}

function DemoRow({ p }: { p: StoredPayout }) {
  const mm = String(Math.floor(p.durationSec / 60)).padStart(2, "0");
  const ss = String(p.durationSec % 60).padStart(2, "0");
  const ago = relativeTime(p.createdAt);
  return (
    <div className="p-4 flex items-center gap-3">
      <Avatar src={p.studentAvatar} alt={p.studentName} size={36} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{p.studentName}</div>
        <div className="text-xs text-zinc-500 truncate">
          {p.subject} · {p.topic} · {mm}:{ss} · {ago}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-accent">+€{(p.netCents / 100).toFixed(2)}</div>
        <div className="text-[10px] text-zinc-500">
          gross €{(p.grossCents / 100).toFixed(2)} − €{(p.commissionCents / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function relativeTime(ts: number): string {
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}
