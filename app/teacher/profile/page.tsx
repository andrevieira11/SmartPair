import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { TEACHER_ME } from "@/lib/mock";
import { IconArrow, IconStar } from "@/components/Icon";

export default function TeacherProfile() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6 flex items-center gap-5">
        <Avatar src={TEACHER_ME.avatar} alt={TEACHER_ME.name} size={72} ring />
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{TEACHER_ME.name}</h1>
          <div className="text-sm text-zinc-500">Tutor · {TEACHER_ME.subjects.join(", ")}</div>
          <div className="mt-1 text-sm inline-flex items-center gap-1">
            <IconStar size={14} className="text-amber-500" /> {TEACHER_ME.rating} ({TEACHER_ME.reviews} reviews) · ${TEACHER_ME.pricePerMin.toFixed(2)}/min
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <RowLink href="/teacher/earnings" label="Earnings & payouts" hint="Weekly bank transfer" />
        <RowLink href="#" label="Availability hours" hint="Mon–Fri 18:00–23:00" />
        <RowLink href="#" label="Pricing & subjects" hint={`$${TEACHER_ME.pricePerMin.toFixed(2)}/min · ${TEACHER_ME.subjects.join(", ")}`} />
        <RowLink href="#" label="Verification" hint="ID & background check — verified" />
        <RowLink href="/role" label="Switch role" hint="Tutor ↔ Student" />
        <RowLink href="/" label="Sign out (demo)" hint="" />
      </section>
    </div>
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
