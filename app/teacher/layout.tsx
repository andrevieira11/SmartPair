import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import Link from "next/link";
import { TEACHER_ME } from "@/lib/mock";
import { IconStar } from "@/components/Icon";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      role="teacher"
      rightHeader={
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2.5 py-1 text-xs font-medium">
            <IconStar size={12} /> {TEACHER_ME.rating}
          </span>
          <Link href="/teacher/profile" aria-label="Profile">
            <Avatar src={TEACHER_ME.avatar} alt={TEACHER_ME.name} size={32} />
          </Link>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
