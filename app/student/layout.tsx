import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { STUDENT } from "@/lib/mock";
import { IconFlame, IconCoin } from "@/components/Icon";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      role="student"
      rightHeader={
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2.5 py-1 text-xs font-medium">
            <IconFlame size={14} /> {STUDENT.streakDays}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft text-brand px-2.5 py-1 text-xs font-medium">
            <IconCoin size={14} /> {STUDENT.points}
          </span>
          <Link href="/student/profile" aria-label="Profile">
            <Avatar src={STUDENT.avatar} alt={STUDENT.name} size={32} />
          </Link>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
