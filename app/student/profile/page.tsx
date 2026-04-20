import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { STUDENT } from "@/lib/mock";
import { IconArrow, IconBolt, IconCoin, IconFlame, IconTrophy } from "@/components/Icon";

export default function StudentProfile() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6 flex items-center gap-5">
        <Avatar src={STUDENT.avatar} alt={STUDENT.name} size={72} ring />
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{STUDENT.name}</h1>
          <div className="text-sm text-zinc-500">Student · Level {STUDENT.level}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <Chip icon={<IconFlame size={12} />} label={`${STUDENT.streakDays}-day streak`} />
            <Chip icon={<IconCoin size={12} />} label={`${STUDENT.points} points`} />
            <Chip icon={<IconBolt size={12} />} label={`${STUDENT.freeMinutesLeftToday} free min left`} />
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <RowLink href="/student/plans" label="Plans & billing" hint="Plus · $9.9/mo" />
        <RowLink href="/student/rewards" label="Rewards & achievements" hint={`${STUDENT.points} pts`} />
        <RowLink href="/role" label="Switch role" hint="Student ↔ Teacher" />
        <RowLink href="/" label="Sign out (demo)" hint="" />
      </section>
    </div>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft text-brand px-2.5 py-1">
      {icon} {label}
    </span>
  );
}

function RowLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <Link href={href} className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between hover:border-foreground/30">
      <div>
        <div className="font-medium">{label}</div>
        {hint && <div className="text-xs text-zinc-500">{hint}</div>}
      </div>
      <IconArrow size={18} className="text-zinc-400" />
    </Link>
  );
}
