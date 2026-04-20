/* eslint-disable @next/next/no-img-element */
export function Avatar({ src, alt, size = 40, ring }: { src: string; alt: string; size?: number; ring?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${ring ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}
