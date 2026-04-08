"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SiteLogo from "@/components/site-logo";
import {
  Search,
  FileText,
  Heart,
  User,
  Home,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Jobs", href: "/jobs", icon: Search },
  { label: "Applications", href: "/applications", icon: FileText },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Profile", href: "/profile", icon: User },
] as const;

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── HEADER ──────────────────────────── */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Left: Logo + context */}
          <div className="flex items-center gap-4">
            <SiteLogo />
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-jade/10 text-jade px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Candidate
            </span>
          </div>

          {/* Center: Pill nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/jobs" && pathname.startsWith(item.href)) ||
                (item.href === "/jobs" && pathname.startsWith("/jobs"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-card text-foreground warm-shadow"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Home + UserButton */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <Home className="size-4" />
              Home
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex items-center justify-around border-t border-border px-2 py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/jobs" && pathname.startsWith(item.href)) ||
              (item.href === "/jobs" && pathname.startsWith("/jobs"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors
                  ${isActive ? "text-terracotta" : "text-foreground-muted"}`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* ── CONTENT ─────────────────────────── */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
