"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { IconClose, IconStar } from "@/components/Icon";
import { TEACHERS, getTeacherById, type Subject } from "@/lib/mock";

export default function MatchingPage() {
  return (
    <Suspense fallback={null}>
      <MatchingInner />
    </Suspense>
  );
}

const PHASES = [
  { t: 500, label: "Looking for available tutors…" },
  { t: 1800, label: "Filtering by your subject & level…" },
  { t: 3200, label: "Two tutors available. Choosing the best fit…" },
  { t: 4500, label: "Inviting tutor to the class…" },
];

function MatchingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const subject = (params.get("subject") as Subject | null) ?? "Math";
  const topic = params.get("topic") ?? "";
  const preselected = params.get("teacher");

  const target = preselected
    ? getTeacherById(preselected) ?? TEACHERS[0]
    : TEACHERS.filter((t) => t.online && t.subjects.includes(subject))[0] ?? TEACHERS[0];

  const [elapsed, setElapsed] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 100) / 10), 100);
    const phaseTimers = PHASES.map((p, i) => setTimeout(() => setPhaseIdx(i), p.t));
    const done = setTimeout(() => {
      router.push(`/student/session/${target.id}?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`);
    }, 6000);
    return () => {
      clearInterval(tick);
      phaseTimers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [router, subject, topic, target.id]);

  return (
    <div className="fixed inset-0 bg-brand-gradient text-white z-40 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-white/25 pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-white/15 pulse-ring" style={{ animationDelay: "0.4s" }} />
          <span className="absolute inset-0 rounded-full bg-white/10 pulse-ring" style={{ animationDelay: "0.8s" }} />
          <div className="relative ring-4 ring-white/40 rounded-full">
            <Avatar src={target.avatar} alt={target.name} size={128} />
          </div>
        </div>

        <div className="mt-10 text-sm opacity-80">Matching · {subject}{topic ? ` · "${topic}"` : ""}</div>
        <div className="mt-2 text-2xl sm:text-3xl font-bold">{PHASES[phaseIdx].label}</div>

        <div className="mt-8 rounded-2xl bg-white/15 backdrop-blur p-4 max-w-sm w-full">
          <div className="flex items-center gap-3">
            <Avatar src={target.avatar} alt={target.name} size={44} />
            <div className="text-left flex-1">
              <div className="font-semibold">{target.name}</div>
              <div className="text-xs opacity-80 inline-flex items-center gap-1">
                <IconStar size={12} /> {target.rating} · ${target.pricePerMin.toFixed(2)}/min
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${Math.min(elapsed / 6 * 100, 100)}%` }} />
          </div>
          <div className="mt-2 text-[11px] opacity-80">{elapsed.toFixed(1)}s elapsed</div>
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="mb-10 mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-5 py-2.5 text-sm"
      >
        <IconClose size={16} /> Cancel
      </button>
    </div>
  );
}
