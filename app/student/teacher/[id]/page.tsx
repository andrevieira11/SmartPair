import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { IconArrow, IconBolt, IconStar, IconBack, IconCheck } from "@/components/Icon";
import { getTeacherById } from "@/lib/mock";

export default async function TeacherDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subject?: string }>;
}) {
  const { id } = await params;
  const { subject } = await searchParams;
  const t = getTeacherById(id);
  if (!t) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/student/find" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-foreground">
        <IconBack size={16} /> Back
      </Link>

      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
        <div className="relative self-center sm:self-start">
          <Avatar src={t.avatar} alt={t.name} size={96} />
          {t.online && <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-accent border-2 border-card" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{t.name}</h1>
            {t.badges.map((b) => (
              <span key={b} className="rounded-full bg-brand-soft text-brand text-[11px] px-2 py-0.5">{b}</span>
            ))}
          </div>
          <div className="mt-1 text-sm text-zinc-500">{t.subjects.join(" · ")} · {t.country}</div>
          <div className="mt-2 inline-flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1"><IconStar size={14} className="text-amber-500" /> {t.rating} ({t.reviews} reviews)</span>
            <span>•</span>
            <span>${t.pricePerMin.toFixed(2)}/min</span>
          </div>
          <p className="mt-4 text-zinc-700 dark:text-zinc-200">{t.bio}</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <Link
              href={`/student/matching?subject=${encodeURIComponent(subject ?? t.subjects[0])}&teacher=${t.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-white px-5 py-3 font-medium"
            >
              <IconBolt size={18} /> Request class now
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-medium">
              Schedule for later
            </button>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-3">
        <InfoCard title="What students say">
          <div className="text-sm space-y-2">
            <Review quote="She explained derivatives in 10 minutes. Top tier." by="Sofia · ★★★★★" />
            <Review quote="Patient and clear. Best tutor I&apos;ve had on here." by="Miguel · ★★★★★" />
          </div>
        </InfoCard>
        <InfoCard title="Verified">
          <ul className="text-sm space-y-1.5 text-zinc-700 dark:text-zinc-200">
            <li className="flex gap-2"><IconCheck size={16} className="text-accent" /> Government ID</li>
            <li className="flex gap-2"><IconCheck size={16} className="text-accent" /> Background check</li>
            <li className="flex gap-2"><IconCheck size={16} className="text-accent" /> Subject certifications</li>
            <li className="flex gap-2"><IconCheck size={16} className="text-accent" /> 18+ confirmed</li>
          </ul>
        </InfoCard>
        <InfoCard title="Next available">
          <div className="text-sm text-zinc-700 dark:text-zinc-200">{t.online ? "Now — join a class instantly." : "In about 2h. Schedule or try instant match."}</div>
          <Link href="/student/find" className="mt-3 inline-flex items-center gap-1 text-brand text-sm font-medium">
            Browse other tutors <IconArrow size={14} />
          </Link>
        </InfoCard>
      </section>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}
function Review({ quote, by }: { quote: string; by: string }) {
  return (
    <div>
      <div className="text-zinc-700 dark:text-zinc-200">“{quote}”</div>
      <div className="text-xs text-zinc-500 mt-0.5">{by}</div>
    </div>
  );
}
