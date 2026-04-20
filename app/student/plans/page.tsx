import { PLANS, STUDENT } from "@/lib/mock";
import { IconCheck } from "@/components/Icon";

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">You&apos;re currently on the <b className="text-brand capitalize">{STUDENT.plan}</b> plan.</p>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        {PLANS.map((p) => {
          const current = p.id === STUDENT.plan;
          return (
            <div key={p.id} className={`rounded-3xl p-6 border ${p.highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border"}`}>
              <div className="flex items-center justify-between text-sm">
                <span className="capitalize">{p.name}</span>
                {p.highlight && <span className="text-xs px-2 py-0.5 rounded-full bg-background/15">Most popular</span>}
              </div>
              <div className="mt-2 text-4xl font-bold">
                ${p.priceMonthly.toFixed(p.priceMonthly % 1 === 0 ? 0 : 2)}
                <span className={`text-base font-medium ${p.highlight ? "opacity-70" : "text-zinc-500"}`}>/mo</span>
              </div>
              <div className={`mt-1 text-sm ${p.highlight ? "opacity-80" : "text-zinc-600 dark:text-zinc-300"}`}>
                {p.freeMinutesPerDay} free tutor minutes per day
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <IconCheck size={16} className={p.highlight ? "text-accent" : "text-brand"} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={current}
                className={`mt-6 w-full rounded-full py-2.5 text-sm font-medium ${
                  current
                    ? "bg-muted text-zinc-500 cursor-not-allowed"
                    : p.highlight
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                }`}
              >
                {current ? "Current plan" : p.priceMonthly === 0 ? "Downgrade" : "Choose plan"}
              </button>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl bg-muted p-5 text-sm text-zinc-600 dark:text-zinc-300">
        You can cancel or switch plans at any time. Unused free minutes don&apos;t roll over to the next day.
      </section>
    </div>
  );
}
