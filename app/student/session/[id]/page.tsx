"use client";

import { Suspense, use, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { IconMic, IconMicOff, IconPhoneOff, IconStar, IconVideo, IconSparkles, IconCheck } from "@/components/Icon";
import { STUDENT, TEACHERS, getTeacherById } from "@/lib/mock";

export default function StudentSessionPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <StudentSessionInner params={params} />
    </Suspense>
  );
}

function StudentSessionInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const search = useSearchParams();
  const subject = search.get("subject") ?? "Math";
  const topic = search.get("topic") ?? "General help";

  const teacher = getTeacherById(id) ?? TEACHERS[0];

  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [ended]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const usedFree = Math.min(secs, STUDENT.freeMinutesLeftToday * 60);
  const billedSecs = Math.max(0, secs - STUDENT.freeMinutesLeftToday * 60);
  const costCents = useMemo(() => Math.ceil(billedSecs / 60 * teacher.pricePerMin * 100), [billedSecs, teacher]);
  const pointsEarned = Math.floor(secs / 60) * 10;

  if (ended) {
    return (
      <div className="max-w-md mx-auto pt-10 space-y-6">
        <div className="rounded-3xl bg-card border border-border p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-accent flex items-center justify-center">
            <IconCheck size={28} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Class finished</h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-1">
            {mm}:{ss} with <b>{teacher.name}</b>
          </p>

          <div className="mt-5 rounded-2xl bg-muted p-4 text-left text-sm space-y-1.5">
            <Row k="Topic" v={`${subject} — ${topic}`} />
            <Row k="Free minutes used" v={`${Math.floor(usedFree / 60)} min`} />
            <Row k="Billed minutes" v={`${Math.ceil(billedSecs / 60)} min`} />
            <Row k="Cost" v={`$${(costCents / 100).toFixed(2)}`} />
            <Row k="Points earned" v={`+${pointsEarned} 🎉`} highlight />
          </div>

          <div className="mt-6">
            <div className="text-sm text-zinc-500 mb-1">Rate your tutor</div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}>
                  <IconStar size={28} className={n <= rating ? "text-amber-500" : "text-zinc-300 dark:text-zinc-600"} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link href="/student" className="rounded-full bg-foreground text-background py-2.5 font-medium">Back home</Link>
            <Link href="/student/find" className="rounded-full border border-border py-2.5 font-medium">Book another class</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white z-40 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar src={teacher.avatar} alt={teacher.name} size={36} />
          <div>
            <div className="text-sm font-semibold leading-tight">{teacher.name}</div>
            <div className="text-[11px] opacity-70">{subject} · {topic}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono tabular-nums">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {mm}:{ss}
        </div>
      </div>

      {/* Video stage */}
      <div className="flex-1 relative bg-black">
        {/* Teacher video (YouTube) */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/3QtRK7Y2pPU?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=3QtRK7Y2pPU"
          title="Live tutor"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-xs rounded-full px-2 py-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
        </div>

        {/* Self tile */}
        <div className="absolute bottom-24 right-3 w-28 sm:w-36 aspect-video rounded-xl overflow-hidden ring-2 ring-white/30 bg-zinc-900 flex items-center justify-center">
          <Avatar src={STUDENT.avatar} alt="You" size={56} />
          <div className="absolute bottom-1 left-1 text-[10px] bg-black/60 rounded px-1">You</div>
        </div>

        {/* Cost hud */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-xl px-3 py-2 text-xs text-right">
          <div>Free left: <b>{Math.max(0, STUDENT.freeMinutesLeftToday - Math.floor(secs / 60))} min</b></div>
          <div className="opacity-80">Billed: ${(costCents / 100).toFixed(2)}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black/80 backdrop-blur px-5 pt-4 pb-8 safe-bottom flex items-center justify-center gap-4">
        <button
          onClick={() => setMuted((m) => !m)}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${muted ? "bg-white text-black" : "bg-white/15"}`}
          aria-label="Toggle mute"
        >
          {muted ? <IconMicOff /> : <IconMic />}
        </button>
        <button
          onClick={() => setEnded(true)}
          className="px-6 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center gap-2 font-semibold"
        >
          <IconPhoneOff size={20} /> End class
        </button>
        <button className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center" aria-label="Toggle camera">
          <IconVideo />
        </button>
      </div>

      {/* Tip banner */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur rounded-full px-3 py-1 text-[11px] inline-flex items-center gap-1">
        <IconSparkles size={12} /> Demo: tutor video is a sample YouTube stream
      </div>
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{k}</span>
      <span className={highlight ? "text-accent font-semibold" : "font-medium"}>{v}</span>
    </div>
  );
}
