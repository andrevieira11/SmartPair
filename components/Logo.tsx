export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <span
        className="inline-flex items-center justify-center rounded-xl bg-brand-gradient text-white font-black"
        style={{ width: size, height: size, fontSize: size * 0.55 }}
        aria-hidden
      >
        S
      </span>
      <span className="font-semibold tracking-tight" style={{ fontSize: size * 0.62 }}>
        SmartPair
      </span>
    </div>
  );
}
