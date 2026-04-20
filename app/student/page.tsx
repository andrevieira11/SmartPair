import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { IconArrow, IconBolt, IconBook, IconChat, IconFlame, IconStar, IconTrophy, IconVideo } from "@/components/Icon";
import { COMMUNITIES, LIBRARY, RECENT_SESSIONS, STUDENT, SUBJECTS, TEACHERS, formatMinutes, getTeacherById } from "@/lib/mock";

export default function StudentHome() {
  const xpPct = Math.round((STUDENT.xp / STUDENT.xpToNextLevel) * 100);
  const onlineTeachers = TEACHERS.filter((t) => t.online).slice(0, 6);
  const topLibrary = LIBRARY.slice(0, 4);
  const hotCommunities = COMMUNITIES.slice(0, 3);

  return (
    <div className="space-y-7">
      {/* Greeting + streak */}
      <section>
        <div className="text-sm text-zinc-500">Welcome back</div>
        <h1 className="text-3xl font-bold tracking-tight">Hi {STUDENT.name} 👋</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">
          You&apos;re on a <b>{STUDENT.streakDays}-day streak</b>. Keep it going!
        </p>
      </section>

      {/* Primary CTA card */}
      <section>
        <Link
          href="/student/find"
          className="group block rounded-3xl p-6 sm:p-8 bg-brand-gradient text-white relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="text-sm opacity-80">Stuck on something right now?</div>
          <div className="mt-1 text-3xl sm:text-4xl font-bold">Find a tutor in &lt;1 min</div>
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-sm">
              <IconBolt size={14} /> {STUDENT.freeMinutesLeftToday} free min left today
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-sm">
              <IconVideo size={14} /> Live 1:1 video
            </span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-medium group-hover:translate-x-0.5 transition-transform">
            Start now <IconArrow size={16} />
          </div>
        </Link>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Streak" value={`${STUDENT.streakDays} days`} icon={<IconFlame className="text-amber-500" />} />
        <StatCard label="Points" value={STUDENT.points.toLocaleString()} icon={<IconTrophy className="text-brand" />} />
        <StatCard label="Level" value={`Lv ${STUDENT.level}`} icon={<IconStar className="text-brand" />}>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: `${xpPct}%` }} />
          </div>
          <div className="mt-1 text-[11px] text-zinc-500">{STUDENT.xp}/{STUDENT.xpToNextLevel} XP</div>
        </StatCard>
        <StatCard label="Plan" value="Plus" icon={<IconBolt className="text-accent" />}>
          <Link href="/student/plans" className="text-xs text-brand font-medium">Manage →</Link>
        </StatCard>
      </section>

      {/* Subjects quick start */}
      <section>
        <SectionHeader title="Jump into a subject" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {SUBJECTS.map((s) => (
            <Link
              key={s}
              href={`/student/find?subject=${encodeURIComponent(s)}`}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-foreground/30"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>

      {/* Online tutors */}
      <section>
        <SectionHeader title="Tutors online now" href="/student/find" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {onlineTeachers.map((t) => (
            <Link key={t.id} href={`/student/teacher/${t.id}`} className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3 hover:border-foreground/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={t.avatar} alt={t.name} size={44} />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-card" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{t.name}</div>
                  <div className="text-xs text-zinc-500 truncate">{t.subjects.join(" · ")}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1"><IconStar size={13} className="text-amber-500" /> {t.rating}</span>
                <span>${t.pricePerMin.toFixed(2)}/min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent sessions */}
      <section>
        <SectionHeader title="Your recent classes" />
        <div className="rounded-2xl bg-card border border-border divide-y divide-border">
          {RECENT_SESSIONS.map((s) => {
            const t = getTeacherById(s.teacherId);
            return (
              <div key={s.id} className="p-4 flex items-center gap-3">
                {t && <Avatar src={t.avatar} alt={t.name} size={36} />}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{s.topic}</div>
                  <div className="text-xs text-zinc-500 truncate">{t?.name} · {s.subject} · {formatMinutes(s.minutes)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">{s.dateLabel}</div>
                  {s.rating && (
                    <div className="text-xs inline-flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: s.rating }).map((_, i) => <IconStar key={i} size={12} />)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Library + Community preview */}
      <section className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold inline-flex items-center gap-2"><IconBook size={18} /> Study library</div>
            <Link href="/student/library" className="text-xs text-brand font-medium">Open →</Link>
          </div>
          <ul className="mt-3 space-y-2">
            {topLibrary.map((l) => (
              <li key={l.id}>
                <Link href={`/student/library/${l.id}`} className="flex items-center justify-between gap-3 text-sm hover:text-brand">
                  <span className="truncate">{l.title}</span>
                  <span className="text-xs text-zinc-500 shrink-0">{formatMinutes(l.minutes)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold inline-flex items-center gap-2"><IconChat size={18} /> Communities</div>
            <Link href="/student/community" className="text-xs text-brand font-medium">Open →</Link>
          </div>
          <ul className="mt-3 space-y-3">
            {hotCommunities.map((c) => (
              <li key={c.id}>
                <Link href={`/student/community/${c.id}`} className="flex items-start gap-3 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center text-brand font-semibold shrink-0">
                    {c.subject[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{c.name}</div>
                    <div className="text-xs text-zinc-500 truncate">
                      {c.lastMessage.who}: {c.lastMessage.text}
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-500 shrink-0">{c.lastMessage.minutesAgo}m</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {href && (
        <Link href={href} className="text-xs text-brand font-medium inline-flex items-center gap-1">
          See all <IconArrow size={14} />
        </Link>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, children }: { label: string; value: string; icon: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center gap-2 text-zinc-500 text-xs">{icon}<span>{label}</span></div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      {children}
    </div>
  );
}
