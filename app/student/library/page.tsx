"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LIBRARY, SUBJECTS, type Subject, formatMinutes } from "@/lib/mock";
import { IconBook, IconSearch } from "@/components/Icon";

const KIND_LABEL: Record<"all" | "exercise" | "notes" | "exam", string> = {
  all: "All",
  exercise: "Exercises",
  notes: "Notes",
  exam: "Past exams",
};
const KINDS = ["all", "exercise", "notes", "exam"] as const;

export default function LibraryPage() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [subject, setSubject] = useState<"all" | Subject>("all");

  const items = useMemo(() => {
    return LIBRARY.filter((l) => {
      if (kind !== "all" && l.kind !== kind) return false;
      if (subject !== "all" && l.subject !== subject) return false;
      if (q && !(l.title + l.author + l.preview).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, kind, subject]);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Study library</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">Notes, exercises and past exams curated by our top tutors.</p>
      </section>

      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5">
        <IconSearch size={18} className="text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search notes, exercises, exams…"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {KINDS.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium border ${
              kind === k ? "bg-foreground text-background border-foreground" : "bg-card border-border"
            }`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        <button
          onClick={() => setSubject("all")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border ${
            subject === "all" ? "bg-brand text-white border-brand" : "bg-card border-border"
          }`}
        >
          All subjects
        </button>
        {SUBJECTS.map((s) => (
          <button
            key={s}
            onClick={() => setSubject(s)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border ${
              subject === s ? "bg-brand text-white border-brand" : "bg-card border-border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((l) => (
          <Link key={l.id} href={`/student/library/${l.id}`} className="rounded-2xl bg-card border border-border p-5 hover:border-foreground/30">
            <div className="flex items-center justify-between text-[11px]">
              <span className={`rounded-full px-2 py-0.5 font-medium ${kindColor(l.kind)}`}>
                {l.kind === "exam" ? "Past exam" : l.kind === "notes" ? "Notes" : "Exercise set"}
              </span>
              <span className="text-zinc-500">{l.subject} · {l.level}</span>
            </div>
            <div className="mt-3 font-semibold">{l.title}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">{l.preview}</div>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
              <span>by {l.author}</span>
              <span>{formatMinutes(l.minutes)} · {"●".repeat(l.difficulty)}{"○".repeat(3 - l.difficulty)}</span>
            </div>
          </Link>
        ))}
        {items.length === 0 && (
          <div className="sm:col-span-2 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-zinc-500">
            <IconBook size={24} className="mx-auto mb-2" />
            No results. Try a broader search.
          </div>
        )}
      </div>
    </div>
  );
}

function kindColor(k: "exercise" | "notes" | "exam") {
  if (k === "exam") return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  if (k === "notes") return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
}
