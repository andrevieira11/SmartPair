"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { IconCheck, IconMic, IconMicOff, IconPhoneOff, IconSparkles, IconVideo } from "@/components/Icon";
import {
  TEACHER_ME,
  computePayout,
  savePayout,
  type StoredPayout,
} from "@/lib/mock";

export default function TeacherSessionPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <TeacherSessionInner params={params} />
    </Suspense>
  );
}

function TeacherSessionInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const search = useSearchParams();
  const name = search.get("name") ?? "Student";
  const subject = search.get("subject") ?? "Math";
  const topic = search.get("topic") ?? "Help needed";
  const avatar = search.get("avatar") ?? "https://i.pravatar.cc/100?img=24";

  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const persisted = useRef(false);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [ended]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const { grossCents, commissionCents, netCents } = computePayout(secs);

  // Persist payout once when class ends
  useEffect(() => {
    if (!ended || persisted.current) return;
    persisted.current = true;
    const payout: StoredPayout = {
      id: `${id}-${Date.now()}`,
      studentName: name,
      studentAvatar: avatar,
      subject,
      topic,
      durationSec: secs,
      grossCents,
      commissionCents,
      netCents,
      createdAt: Date.now(),
    };
    savePayout(payout);
  }, [ended, id, name, avatar, subject, topic, secs, grossCents, commissionCents, netCents]);

  if (ended) {
    return (
      <div className="max-w-md mx-auto pt-10">
        <div className="rounded-3xl bg-card border border-border p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-accent flex items-center justify-center">
              <IconCheck size={28} />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Class wrapped up</h1>
            <p className="text-zinc-600 dark:text-zinc-300 mt-1">{mm}:{ss} with {name}</p>
          </div>

          {/* Earnings hero */}
          <div className="mt-5 rounded-2xl bg-brand-gradient text-white p-5 text-center">
            <div className="text-xs opacity-80">Net payout</div>
            <div className="text-4xl font-bold tracking-tight">€{(netCents / 100).toFixed(2)}</div>
            <div className="text-[11px] opacity-80 mt-1">After SmartPair commission</div>
          </div>

          {/* Breakdown */}
          <div className="mt-4 rounded-2xl bg-muted p-4 text-sm space-y-1.5">
            <Row k="Subject" v={subject} />
            <Row k="Topic" v={topic} />
            <Row k="Duration" v={`${mm}:${ss}`} />
            <div className="my-2 border-t border-border" />
            <Row k="Gross earnings" v={`€${(grossCents / 100).toFixed(2)}`} />
            <Row k="SmartPair commission (35%)" v={`− €${(commissionCents / 100).toFixed(2)}`} muted />
            <div className="my-2 border-t border-border" />
            <Row k="You receive" v={`€${(netCents / 100).toFixed(2)}`} highlight />
          </div>

          <div className="mt-5 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 px-3 py-2 text-[11px]">
            Demo rate: €5/sec gross. Saved to this device for 24h — visible in <Link href="/teacher/earnings" className="underline">Earnings</Link>.
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Link href="/teacher/earnings" className="rounded-full bg-foreground text-background py-2.5 text-sm font-medium text-center">See in earnings →</Link>
            <Link href="/teacher" className="rounded-full border border-border py-2.5 text-sm font-medium text-center">Back to requests</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white z-40 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar src={avatar} alt={name} size={36} />
          <div>
            <div className="text-sm font-semibold leading-tight">{name}</div>
            <div className="text-[11px] opacity-70">{subject} · {topic}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono tabular-nums">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {mm}:{ss}
        </div>
      </div>

      <div className="flex-1 relative bg-black">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/Ks-_Mh1QhMc?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=Ks-_Mh1QhMc"
          title="Student webcam"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-xs rounded-full px-2 py-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
        </div>
        <div className="absolute bottom-24 right-3 w-28 sm:w-36 aspect-video rounded-xl overflow-hidden ring-2 ring-white/30 bg-zinc-900 flex items-center justify-center">
          <Avatar src={TEACHER_ME.avatar} alt="You" size={56} />
          <div className="absolute bottom-1 left-1 text-[10px] bg-black/60 rounded px-1">You (tutor)</div>
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-xl px-3 py-2 text-xs text-right">
          <div>Gross: <b>€{(grossCents / 100).toFixed(2)}</b></div>
          <div className="opacity-80">Net (after 35%): €{(netCents / 100).toFixed(2)}</div>
        </div>
      </div>

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

      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur rounded-full px-3 py-1 text-[11px] inline-flex items-center gap-1">
        <IconSparkles size={12} /> Demo: student video is a sample YouTube stream
      </div>
    </div>
  );
}

function Row({ k, v, highlight, muted }: { k: string; v: string; highlight?: boolean; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{k}</span>
      <span
        className={
          highlight
            ? "text-accent font-semibold"
            : muted
              ? "text-zinc-500"
              : "font-medium"
        }
      >
        {v}
      </span>
    </div>
  );
}
