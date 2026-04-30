import { PLANS, STUDENT } from "@/lib/mock";
import { IconCheck, IconStar } from "@/components/Icon";

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mt-1">
          You&apos;re currently on the <b className="text-brand">{currentPlanName()}</b> plan.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANS.map((p) => {
          const current = p.id === STUDENT.plan;
          return (
            <div
              key={p.id}
              className={`relative rounded-3xl p-6 border flex flex-col ${
                p.highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1">
                  <IconStar size={11} /> {p.tagline.toUpperCase()}
                </span>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{p.name}</span>
                {!p.highlight && (
                  <span className="text-[10px] uppercase tracking-wide text-zinc-500">{p.tagline}</span>
                )}
              </div>

              <div className="mt-2">
                <span className="text-3xl font-bold">€{p.priceMonthly.toFixed(2).replace(".", ",")}</span>
                <span className={`text-sm font-medium ${p.highlight ? "opacity-70" : "text-zinc-500"}`}>/mês</span>
              </div>

              <div className={`mt-3 text-xs ${p.highlight ? "opacity-80" : "text-zinc-600 dark:text-zinc-300"}`}>
                {p.included}
              </div>

              <div
                className={`mt-2 text-[11px] rounded-lg px-2 py-1.5 ${
                  p.highlight ? "bg-background/15" : "bg-muted"
                }`}
              >
                <b>Tutor:</b> {p.tutorTier}
              </div>

              <ul className="mt-4 space-y-2 text-sm flex-1">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <IconCheck size={16} className={p.highlight ? "text-accent shrink-0 mt-0.5" : "text-brand shrink-0 mt-0.5"} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-5 text-[11px] italic ${p.highlight ? "opacity-80" : "text-zinc-500"}`}>
                Ideal: {p.ideal}
              </div>

              <button
                disabled={current}
                className={`mt-5 w-full rounded-full py-2.5 text-sm font-medium ${
                  current
                    ? "bg-muted text-zinc-500 cursor-not-allowed"
                    : p.highlight
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                }`}
              >
                {current ? "Plano atual" : p.priceMonthly === 0 ? "Mudar para Básico" : `Escolher ${p.name}`}
              </button>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl bg-muted p-5 text-sm text-zinc-600 dark:text-zinc-300">
        Cancela ou troca de plano a qualquer momento. Aulas mensais não acumulam para o mês seguinte.
      </section>
    </div>
  );
}

function currentPlanName() {
  return PLANS.find((p) => p.id === STUDENT.plan)?.name ?? "Básico";
}
