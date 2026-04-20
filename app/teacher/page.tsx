"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { IconArrow, IconCheck, IconClose, IconStar, IconCoin, IconBolt } from "@/components/Icon";
import { INCOMING_REQUESTS, TEACHER_ME, formatMoney } from "@/lib/mock";

export default function TeacherHome() {
  const [available, setAvailable] = useState(true);
  const [queue, setQueue] = useState(INCOMING_REQUESTS);

  useEffect(() => {
    if (!available) return;
    const t = setInterval(() => {
      setQueue((q) => q.map((r) => ({ ...r, waitingSec: r.waitingSec + 1 })));
    }, 1000);
    return () => clearInterval(t);
  }, [available]);

  const decline = (id: string) => setQueue((q) => q.filter((r) => r.id !== id));

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Avatar src={TEACHER_ME.avatar} alt={TEACHER_ME.name} size={64} />
        <div className="flex-1">
          <div className="text-sm text-zinc-500">Welcome back</div>
          <h1 className="text-2xl font-bold tracking-tight">{TEACHER_ME.name}</h1>
          <div className="text-sm text-zinc-500 mt-1">
            <IconStar size={12} className="inline text-amber-500 -mt-0.5 mr-1" />
            {TEACHER_ME.rating} · {TEACHER_ME.reviews} reviews · {TEACHER_ME.subjects.join(", ")}
          </div>
        </div>
        <label className="inline-flex items-center gap-3 rounded-full bg-muted px-4 py-2 text-sm font-medium">
          <span className={`w-2.5 h-2.5 rounded-full ${available ? "bg-accent animate-pulse" : "bg-zinc-400"}`} />
          {available ? "Available" : "Offline"}
          <input
            type="checkbox"
            className="sr-only"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <span className={`relative inline-block w-10 h-6 rounded-full transition ${available ? "bg-accent" : "bg-zinc-400"}`}>
            <span className={`absolute top-0.5 ${available ? "right-0.5" : "left-0.5"} w-5 h-5 rounded-full bg-white shadow`} />
          </span>
        </label>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="This week" value={formatMoney(TEACHER_ME.earningsThisWeekCents)} icon={<IconCoin className="text-brand" />} />
        <Stat label="This month" value={formatMoney(TEACHER_ME.earningsThisMonthCents)} icon={<IconCoin className="text-accent" />} />
        <Stat label="Minutes taught" value={`${TEACHER_ME.minutesThisWeek}`} icon={<IconBolt className="text-amber-500" />} />
        <Stat label="Price" value={`$${TEACHER_ME.pricePerMin.toFixed(2)}/min`} icon={<IconStar className="text-brand" />} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold tracking-tight">Incoming requests</h2>
          {available && <span className="text-xs text-zinc-500">{queue.length} waiting</span>}
        </div>

        {!available && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-zinc-500">
            You&apos;re offline. Flip the switch above to start receiving student requests.
          </div>
        )}

        {available && queue.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-zinc-500">
            No requests right now — new students will pop up here as soon as they hit &ldquo;Instant match&rdquo;.
          </div>
        )}

        {available && (
          <div className="grid sm:grid-cols-2 gap-3">
            {queue.map((r) => (
              <div key={r.id} className="rounded-2xl bg-card border border-border p-4">
                <div className="flex items-center gap-3">
                  <Avatar src={r.studentAvatar} alt={r.studentName} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{r.studentName}</div>
                    <div className="text-xs text-zinc-500 truncate">{r.subject} · {r.topic}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-zinc-500">waiting</div>
                    <div className="text-sm font-mono tabular-nums">{r.waitingSec}s</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand-soft text-brand px-2 py-0.5">Est. earn ${(r.budgetPerMin * 20).toFixed(2)} (20 min)</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => decline(r.id)} className="flex-1 rounded-full border border-border py-2 text-sm font-medium inline-flex items-center justify-center gap-1">
                    <IconClose size={14} /> Decline
                  </button>
                  <Link
                    href={`/teacher/session/${r.id}?name=${encodeURIComponent(r.studentName)}&subject=${encodeURIComponent(r.subject)}&topic=${encodeURIComponent(r.topic)}&avatar=${encodeURIComponent(r.studentAvatar)}`}
                    className="flex-1 rounded-full bg-brand-gradient text-white py-2 text-sm font-medium inline-flex items-center justify-center gap-1"
                  >
                    <IconCheck size={14} /> Accept
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-brand-soft p-5 flex items-center gap-4">
        <div className="flex-1">
          <div className="font-semibold">Stay active during exam season</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-200">Teachers available during peak hours earn 40% more on average.</div>
        </div>
        <Link href="/teacher/earnings" className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium">
          See earnings <IconArrow size={14} />
        </Link>
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
