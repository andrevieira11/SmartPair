/* eslint-disable @next/next/no-img-element */
export function Logo({ size = 28, hideText = false }: { size?: number; hideText?: boolean }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/logo.png"
        alt="SmartPair"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain shrink-0"
      />
      {!hideText && (
        <span className="font-semibold tracking-tight" style={{ fontSize: size * 0.62 }}>
          SmartPair
        </span>
      )}
    </div>
  );
}

/** Logo mark only (no wordmark). For tight spots. */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo.png"
      alt="SmartPair"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain ${className}`}
    />
  );
}
