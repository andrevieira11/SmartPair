"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { IconHome, IconSearch, IconBook, IconChat, IconTrophy, IconUser } from "./Icon";
import type { ReactNode } from "react";

type NavItem = { href: string; label: string; icon: ReactNode };

export function AppShell({
  role,
  children,
  rightHeader,
}: {
  role: "student" | "teacher";
  children: ReactNode;
  rightHeader?: ReactNode;
}) {
  const studentNav: NavItem[] = [
    { href: "/student", label: "Home", icon: <IconHome /> },
    { href: "/student/find", label: "Find", icon: <IconSearch /> },
    { href: "/student/library", label: "Library", icon: <IconBook /> },
    { href: "/student/community", label: "Chats", icon: <IconChat /> },
    { href: "/student/rewards", label: "Rewards", icon: <IconTrophy /> },
  ];
  const teacherNav: NavItem[] = [
    { href: "/teacher", label: "Requests", icon: <IconHome /> },
    { href: "/teacher/earnings", label: "Earnings", icon: <IconTrophy /> },
    { href: "/teacher/community", label: "Chats", icon: <IconChat /> },
    { href: "/teacher/profile", label: "Profile", icon: <IconUser /> },
  ];
  const nav = role === "student" ? studentNav : teacherNav;

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card sticky top-0 h-screen p-5">
        <Link href="/"><Logo /></Link>
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((n) => (
            <NavLink key={n.href} item={n} />
          ))}
        </nav>
        <div className="mt-auto">
          <Link href="/role" className="block text-xs text-zinc-500 hover:text-foreground">Switch role →</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile + desktop) */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-5xl mx-auto w-full">
            <div className="lg:hidden"><Logo size={24} /></div>
            <div className="hidden lg:block text-sm text-zinc-500 capitalize">{role} app</div>
            <div className="flex items-center gap-2">{rightHeader}</div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 pb-28 lg:pb-8">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur border-t border-border safe-bottom">
          <div className="max-w-xl mx-auto grid" style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }}>
            {nav.map((n) => (
              <BottomLink key={n.href} item={n} />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href !== "/student" && item.href !== "/teacher" && pathname?.startsWith(item.href));
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
        active ? "bg-foreground text-background" : "text-zinc-600 hover:bg-muted dark:text-zinc-300"
      }`}
    >
      <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
      {item.label}
    </Link>
  );
}

function BottomLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isRoot = item.href === "/student" || item.href === "/teacher";
  const active = isRoot ? pathname === item.href : pathname?.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
        active ? "text-brand" : "text-zinc-500"
      }`}
    >
      <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
      {item.label}
    </Link>
  );
}
