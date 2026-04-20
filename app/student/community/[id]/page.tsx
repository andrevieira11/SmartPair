"use client";

import Link from "next/link";
import { use, useState } from "react";
import { COMMUNITIES, COMMUNITY_FEED, type ChatMessage } from "@/lib/mock";
import { IconBack, IconArrow } from "@/components/Icon";
import { notFound } from "next/navigation";

export default function CommunityRoom({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const community = COMMUNITIES.find((c) => c.id === id);
  if (!community) return notFound();
  const initial = COMMUNITY_FEED[id] ?? [
    { id: "x", who: "Tutor", role: "tutor", text: "Welcome! Be the first to ask a question.", minutesAgo: 1 } as ChatMessage,
  ];
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: `local-${prev.length}`, who: "You", role: "student", text: draft.trim(), minutesAgo: 0 }]);
    setDraft("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `tutor-${prev.length}`, who: "Ana (tutor)", role: "tutor", text: "Great question — give me a sec to write a clear answer ✏️", minutesAgo: 0 },
      ]);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between">
        <Link href="/student/community" className="inline-flex items-center gap-1 text-sm text-zinc-500">
          <IconBack size={16} /> Communities
        </Link>
        <div className="text-xs text-zinc-500">{community.members.toLocaleString()} members</div>
      </div>

      <h1 className="mt-2 text-2xl font-bold tracking-tight">{community.name}</h1>
      <div className="text-xs text-zinc-500">Subject: {community.subject}</div>

      <div className="mt-4 flex-1 overflow-y-auto rounded-2xl bg-card border border-border p-3 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask a question…"
          className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-foreground"
        />
        <button onClick={send} className="rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium inline-flex items-center gap-1">
          Send <IconArrow size={14} />
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ m }: { m: ChatMessage }) {
  const me = m.who === "You";
  const tutor = m.role === "tutor";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
        me ? "bg-foreground text-background rounded-br-sm"
           : tutor ? "bg-brand-soft text-foreground rounded-bl-sm"
           : "bg-muted text-foreground rounded-bl-sm"
      }`}>
        {!me && <div className="text-[10px] opacity-70 mb-0.5">{m.who}</div>}
        <div>{m.text}</div>
      </div>
    </div>
  );
}
