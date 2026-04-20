import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export function IconHome({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
export function IconSearch({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
export function IconBook({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Z" />
      <path d="M4 19V5" />
    </svg>
  );
}
export function IconChat({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
export function IconTrophy({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M4 5h3v3a3 3 0 0 1-3-3Z" />
      <path d="M20 5h-3v3a3 3 0 0 0 3-3Z" />
    </svg>
  );
}
export function IconUser({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
export function IconVideo({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3z" />
    </svg>
  );
}
export function IconMic({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}
export function IconMicOff({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="m3 3 18 18" />
      <path d="M9 9v2a3 3 0 0 0 5 2" />
      <path d="M15 11V6a3 3 0 0 0-6 0" />
      <path d="M5 11a7 7 0 0 0 11 5.6" />
      <path d="M19 11a7 7 0 0 1-.3 2" />
    </svg>
  );
}
export function IconPhoneOff({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 3.2 2 2 0 0 1 4 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2L7 8.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
export function IconStar({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p} fill="currentColor" stroke="none">
      <path d="M12 2.5l2.9 6 6.6.6-5 4.6 1.5 6.5L12 16.9 5.9 20.2 7.4 13.7 2.4 9.1l6.6-.6z" />
    </svg>
  );
}
export function IconFlame({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 2s3 4 3 7a3 3 0 1 1-6 0c0-1 .4-2 .4-2" />
      <path d="M6 14a6 6 0 0 0 12 0c0-4-4-5-4-9 0 0-4 2-4 6 0 2-1 3-2 3s-2-1-2-1Z" />
    </svg>
  );
}
export function IconBolt({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p} fill="currentColor" stroke="none">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}
export function IconArrow({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
export function IconBack({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
export function IconCheck({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
export function IconClose({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}
export function IconCoin({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h4.5a1.5 1.5 0 0 1 0 3H9" />
      <path d="M9 13h5a1.5 1.5 0 0 1 0 3H9" />
    </svg>
  );
}
export function IconSparkles({ size = 22, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M5 12H1" />
      <path d="M23 12h-4" />
      <path d="m6 6 2 2" />
      <path d="m16 16 2 2" />
      <path d="m18 6-2 2" />
      <path d="m8 16-2 2" />
    </svg>
  );
}
