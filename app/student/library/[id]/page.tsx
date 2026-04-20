import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrow, IconBack, IconBolt, IconChat } from "@/components/Icon";
import { LIBRARY, formatMinutes } from "@/lib/mock";

export default async function LibraryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = LIBRARY.find((l) => l.id === id);
  if (!item) return notFound();

  const sampleBody =
    item.kind === "exam"
      ? [
          "Question 1 (2 points)",
          "Find the derivative of f(x) = x^3 · sin(x) and evaluate at x = 0.",
          "Question 2 (3 points)",
          "A particle moves along a line with velocity v(t) = 4t - 3. Find the displacement between t = 1 and t = 3.",
          "Question 3 (5 points)",
          "State and prove the Mean Value Theorem, then give a geometric interpretation.",
        ]
      : item.kind === "notes"
        ? [
            "1. Key formulas",
            "• v = v₀ + at   • x = x₀ + v₀ t + ½ a t²   • v² = v₀² + 2a(x − x₀)",
            "2. Sign conventions",
            "Pick your positive direction first and stick with it. Down-as-positive is fine if everything else follows.",
            "3. Common traps",
            "Confusing average velocity with instantaneous velocity. Forgetting units. Mixing reference frames.",
          ]
        : [
            "Warm-up set (5 problems)",
            "1) d/dx [x² + 3x] =",
            "2) d/dx [sin(2x)] =",
            "3) d/dx [x · ln(x)] =",
            "4) ∫ (2x + 1) dx =",
            "5) ∫ e^x dx =",
            "Full solutions available in the companion PDF.",
          ];

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/student/library" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-foreground">
        <IconBack size={16} /> Back to library
      </Link>

      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6">
        <div className="text-xs text-zinc-500">{item.subject} · {item.level} · {formatMinutes(item.minutes)} · by {item.author}</div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">{item.title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{item.preview}</p>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <button className="rounded-full bg-foreground text-background px-5 py-2.5 font-medium">Start {item.kind === "exam" ? "exam" : "now"}</button>
          <Link href={`/student/find?subject=${encodeURIComponent(item.subject)}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-medium">
            <IconBolt size={16} /> Ask a tutor about this
          </Link>
        </div>
      </section>

      <section className="rounded-3xl bg-card border border-border p-5 sm:p-6">
        <h2 className="font-semibold">Preview</h2>
        <div className="mt-3 space-y-2 font-mono text-sm whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
          {sampleBody.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-brand-soft p-5 sm:p-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand"><IconChat /></div>
        <div className="flex-1">
          <div className="font-semibold">Still stuck?</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-200">Join a tutor live for this exact topic.</div>
        </div>
        <Link href={`/student/matching?subject=${encodeURIComponent(item.subject)}&topic=${encodeURIComponent(item.title)}`} className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium">
          Match me <IconArrow size={14} />
        </Link>
      </section>
    </div>
  );
}
