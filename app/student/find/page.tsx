"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { IconArrow, IconBolt, IconSearch, IconStar } from "@/components/Icon";
import { SUBJECTS, TEACHERS, type Subject } from "@/lib/mock";

export default function FindPage() {
  return (
    <Suspense fallback={null}>
      <FindInner />
    </Suspense>
  );
}

function FindInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialSubject = (params.get("subject") as Subject | null) ?? "Math";
  const [subject, setSubject] = useState<Subject>(initialSubject);
  const [topic, setTopic] = useState("");
  const [onlyTopRated, setOnlyTopRated] = useState(false);

  const filtered = useMemo(() => {
    return TEACHERS.filter((t) => t.subjects.includes(subject)).filter((t) => (onlyTopRated ? t.rating >= 4.85 : true));
  }, [subject, onlyTopRated]);

  const onInstantMatch = () => {
    router.push(`/student/matching?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Find a tutor</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">
          Tell us what you&apos;re stuck on. We&apos;ll instantly match you — or you can pick a specific tutor below.
        </p>
      </section>

      {/* Instant match box */}
      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6">
        <label className="text-sm font-medium">Subject</label>
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                subject === s
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border text-zinc-700 dark:text-zinc-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="text-sm font-medium mt-4 block">What do you need help with?</label>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2.5">
            <IconSearch size={18} className="text-zinc-500" />
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder='e.g. "Implicit differentiation"'
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyTopRated} onChange={(e) => setOnlyTopRated(e.target.checked)} />
            Only 4.85+ rated tutors
          </label>
          <div className="text-xs text-zinc-500">Avg match: <b className="text-foreground">28s</b></div>
        </div>

        <button
          onClick={onInstantMatch}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-white py-3 font-medium"
        >
          <IconBolt size={18} /> Instant match
        </button>
      </section>

      {/* Available tutors */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-3">Or pick a tutor for <span className="text-brand">{subject}</span></h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((t) => (
            <Link key={t.id} href={`/student/teacher/${t.id}?subject=${encodeURIComponent(subject)}`} className="rounded-2xl bg-card border border-border p-4 flex gap-3 hover:border-foreground/30">
              <div className="relative">
                <Avatar src={t.avatar} alt={t.name} size={56} />
                {t.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-accent border-2 border-card" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold truncate">{t.name}</div>
                  <div className="text-xs inline-flex items-center gap-1 shrink-0"><IconStar size={12} className="text-amber-500" />{t.rating} ({t.reviews})</div>
                </div>
                <div className="text-xs text-zinc-500">{t.subjects.join(" · ")} · {t.country}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">{t.bio}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    {t.badges.map((b) => (
                      <span key={b} className="rounded-full bg-brand-soft text-brand text-[10px] px-2 py-0.5">{b}</span>
                    ))}
                  </div>
                  <div className="text-sm font-semibold">${t.pricePerMin.toFixed(2)}<span className="text-xs text-zinc-500">/min</span></div>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-zinc-500 sm:col-span-2">
              No tutors online for {subject} right now. Try Instant match — we&apos;ll ping available tutors.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
