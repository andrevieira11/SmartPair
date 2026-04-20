import Link from "next/link";
import { COMMUNITIES } from "@/lib/mock";
import { IconChat, IconSparkles } from "@/components/Icon";

export default function TeacherCommunity() {
  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">Answer questions publicly to boost your profile and attract more students.</p>
      </section>

      <section className="rounded-2xl bg-brand-soft p-5 flex items-center gap-3">
        <IconSparkles className="text-brand" />
        <div className="text-sm">Tutors who answer <b>5+ community questions/week</b> get matched 2x more often.</div>
      </section>

      <div className="rounded-2xl bg-card border border-border divide-y divide-border">
        {COMMUNITIES.map((c) => (
          <Link key={c.id} href={`/student/community/${c.id}`} className="flex items-center gap-3 p-4 hover:bg-muted">
            <div className="w-11 h-11 rounded-2xl bg-brand-soft flex items-center justify-center text-brand font-bold">{c.subject[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-[11px] text-zinc-500">{c.lastMessage.minutesAgo}m</div>
              </div>
              <div className="text-xs text-zinc-500 truncate">
                <b className="text-zinc-700 dark:text-zinc-200">{c.lastMessage.who}:</b> {c.lastMessage.text}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 inline-flex items-center gap-1"><IconChat size={11} /> {c.members.toLocaleString()} members</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
