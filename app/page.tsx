"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import SiteLogo from "@/components/site-logo";
import {
  Search,
  MapPin,
  ChevronDown,
  UserPlus,
  FileText,
  Briefcase,
  Send,
  Users,
  Building2,
  Menu,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA CONSTANTS
   ───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "For Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const;

const EMPLOYMENT_TYPES = [
  "All types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
] as const;

const POPULAR_TAGS = ["Design", "Art", "Business", "Video Editing"] as const;

const FLOATING_AVATARS = [
  { img: 1, top: "8%", left: "6%", delay: "0s", size: 64 },
  { img: 3, top: "18%", right: "8%", delay: "0.5s", size: 56 },
  { img: 5, top: "55%", left: "4%", delay: "1s", size: 52 },
  { img: 8, top: "62%", right: "5%", delay: "1.5s", size: 60 },
  { img: 12, top: "35%", left: "10%", delay: "0.8s", size: 48 },
  { img: 15, top: "42%", right: "12%", delay: "1.2s", size: 54 },
] as const;

const DECORATION_DOTS = [
  { color: "bg-jade", top: "12%", left: "14%", delay: "0.3s", size: 10 },
  { color: "bg-amber-accent", top: "25%", right: "16%", delay: "0.7s", size: 8 },
  { color: "bg-destructive", top: "48%", left: "8%", delay: "1.1s", size: 6 },
  { color: "bg-jade", top: "60%", right: "10%", delay: "0.6s", size: 8 },
  { color: "bg-amber-accent", top: "72%", left: "12%", delay: "1.4s", size: 10 },
  { color: "bg-destructive", top: "30%", right: "6%", delay: "0.9s", size: 7 },
] as const;

const MOCK_COMPANIES = [
  { name: "Stripe", style: "font-bold tracking-tight" },
  { name: "Vercel", style: "font-light tracking-widest uppercase" },
  { name: "Linear", style: "font-semibold italic" },
  { name: "Notion", style: "font-extrabold tracking-tight" },
  { name: "Figma", style: "font-medium tracking-wide" },
  { name: "Loom", style: "font-bold italic tracking-wider" },
] as const;

const HOW_IT_WORKS = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with your email or social account. It's completely free to get started.",
  },
  {
    icon: FileText,
    title: "Complete your profile",
    description: "Add your skills, experience, and preferences so we can match you with the right opportunities.",
  },
  {
    icon: Send,
    title: "Apply job or hire",
    description: "Browse curated listings and apply with one click, or post jobs and find the perfect candidate.",
  },
] as const;

/* ─────────────────────────────────────────────
   LANDING PAGE
   ───────────────────────────────────────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [employmentType, setEmploymentType] = useState("All types");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (employmentType !== "All types") params.set("type", employmentType);
    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HEADER ──────────────────────────── */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <SiteLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-sm">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-4">
            <Unauthenticated>
              <SignInButton mode="modal">
                <button className="btn-press inline-flex items-center gap-2 rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-white warm-shadow-md hover:opacity-90 transition-opacity cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <UserButton afterSignOutUrl="/" />
            </Authenticated>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 btn-press text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border animate-slide-down">
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link py-2 text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <button className="btn-press w-full rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-white cursor-pointer">
                      Sign In
                    </button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <UserButton afterSignOutUrl="/" />
                </Authenticated>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ────────────────────── */}
      <main className="flex-1">
        {/* ── HERO SECTION ────────────────── */}
        <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-36">
          {/* Floating avatars */}
          {FLOATING_AVATARS.map((avatar) => (
            <div
              key={avatar.img}
              className="hidden lg:block absolute animate-float rounded-full overflow-hidden warm-shadow-lg ring-2 ring-white/50"
              style={{
                top: avatar.top,
                left: "left" in avatar ? avatar.left : undefined,
                right: "right" in avatar ? avatar.right : undefined,
                animationDelay: avatar.delay,
                width: avatar.size,
                height: avatar.size,
                zIndex: 1,
              }}
            >
              <Image
                src={`https://i.pravatar.cc/120?img=${avatar.img}`}
                alt=""
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Floating decoration dots */}
          {DECORATION_DOTS.map((dot, i) => (
            <div
              key={i}
              className={`hidden lg:block absolute rounded-full animate-float ${dot.color}`}
              style={{
                top: dot.top,
                left: "left" in dot ? dot.left : undefined,
                right: "right" in dot ? dot.right : undefined,
                animationDelay: dot.delay,
                width: dot.size,
                height: dot.size,
                zIndex: 1,
              }}
            />
          ))}

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1
              className="animate-fade-in text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Discover your{" "}
              <span className="text-gradient">dream</span>{" "}
              career path
            </h1>

            <p className="animate-fade-in stagger-2 mx-auto mt-6 max-w-xl text-lg text-foreground-muted md:text-xl leading-relaxed">
              Every great hire and every dream job starts with a single step.
              Take yours today with Jobly.
            </p>

            {/* ── SEARCH FORM ─────────────── */}
            <form
              onSubmit={handleSearch}
              className="animate-fade-in stagger-3 mx-auto mt-10 flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl bg-card border border-border rounded-2xl p-2 warm-shadow-lg"
            >
              {/* Employment type dropdown */}
              <div className="relative flex items-center">
                <Briefcase className="absolute left-3 size-4 text-foreground-muted pointer-events-none" />
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="appearance-none bg-transparent pl-9 pr-8 py-3 text-sm text-foreground font-medium rounded-xl focus:outline-none cursor-pointer w-full sm:w-auto"
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 size-4 text-foreground-muted pointer-events-none" />
              </div>

              <div className="hidden sm:block w-px bg-border self-stretch my-2" />

              {/* Keyword input */}
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 size-4 text-foreground-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-transparent pl-9 pr-3 py-3 text-sm text-foreground placeholder:text-foreground-muted rounded-xl focus:outline-none"
                />
              </div>

              <div className="hidden sm:block w-px bg-border self-stretch my-2" />

              {/* Location input */}
              <div className="relative flex-1 flex items-center">
                <MapPin className="absolute left-3 size-4 text-foreground-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="City or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent pl-9 pr-3 py-3 text-sm text-foreground placeholder:text-foreground-muted rounded-xl focus:outline-none"
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="btn-press flex items-center justify-center gap-2 bg-terracotta text-white font-semibold text-sm rounded-xl px-6 py-3 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Search className="size-4" />
                Search
              </button>
            </form>

            {/* ── POPULAR TAGS ────────────── */}
            <div className="animate-fade-in stagger-4 mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-foreground-muted font-medium">Popular:</span>
              {POPULAR_TAGS.map((tag) => (
                <Link
                  key={tag}
                  href={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="badge badge-accent hover:opacity-80 transition-opacity"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPANY LOGOS ────────────────── */}
        <section className="border-y border-border bg-muted/50 px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="animate-fade-in text-center text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-10">
              Trusted by teams at leading companies
            </p>
            <div className="animate-fade-in stagger-2 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
              {MOCK_COMPANIES.map((company) => (
                <span
                  key={company.name}
                  className={`text-xl text-foreground-muted/40 hover:text-foreground-muted/70 transition-colors cursor-default select-none ${company.style}`}
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────── */}
        <section className="px-6 py-24 md:py-32" id="how-it-works">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <p className="animate-fade-in text-sm font-semibold uppercase tracking-widest text-terracotta mb-3">
                How It Works
              </p>
              <h2
                className="animate-fade-in stagger-1 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Get started in 3 easy steps
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`animate-fade-in stagger-${i + 2} card-hover relative rounded-2xl border border-border bg-card p-8 text-center warm-shadow`}
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                      <Icon className="size-6" />
                    </div>
                    <h3
                      className="text-lg font-bold text-foreground mb-2"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TWO-PATH SECTION ────────────── */}
        <section className="bg-muted/30 border-y border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <p className="animate-fade-in text-sm font-semibold uppercase tracking-widest text-terracotta mb-3">
                Built for everyone
              </p>
              <h2
                className="animate-fade-in stagger-1 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Whether you&apos;re hiring or looking
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Candidate card */}
              <div className="animate-fade-in stagger-2 card-hover rounded-2xl border border-border bg-card p-8 warm-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jade/10 text-jade mb-6">
                  <Users className="size-6" />
                </div>
                <h3
                  className="text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  For Candidates
                </h3>
                <ul className="space-y-3">
                  {["Find Jobs", "Build Profile", "Track Applications"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground-muted">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-jade/10 text-jade text-xs">✓</span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <button className="btn-press mt-6 w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                      Get Started
                    </button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <Link
                    href="/jobs"
                    className="btn-press block mt-6 w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold text-center hover:opacity-90 transition-opacity"
                  >
                    Browse Jobs
                  </Link>
                </Authenticated>
              </div>

              {/* Company card */}
              <div className="animate-fade-in stagger-3 card-hover rounded-2xl border border-border bg-card p-8 warm-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta mb-6">
                  <Building2 className="size-6" />
                </div>
                <h3
                  className="text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  For Companies
                </h3>
                <ul className="space-y-3">
                  {["Post Jobs", "Review Candidates", "Manage Team"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground-muted">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta/10 text-terracotta text-xs">✓</span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <button className="btn-press mt-6 w-full rounded-xl border-2 border-border bg-card text-foreground py-3 text-sm font-semibold hover:border-foreground-muted transition-colors cursor-pointer">
                      Start Hiring
                    </button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <Link
                    href="/companies"
                    className="btn-press block mt-6 w-full rounded-xl border-2 border-border bg-card text-foreground py-3 text-sm font-semibold text-center hover:border-foreground-muted transition-colors"
                  >
                    Company Dashboard
                  </Link>
                </Authenticated>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS SECTION ───────────────── */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { value: "100K+", label: "Jobs posted" },
                { value: "50K+", label: "Companies hiring" },
                { value: "1M+", label: "Candidates matched" },
              ].map((stat) => (
                <div key={stat.label} className="animate-fade-in">
                  <p
                    className="text-5xl md:text-6xl font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium uppercase tracking-wider text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ─────────────────── */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-12 md:p-16 text-center warm-shadow-lg relative overflow-hidden">
            {/* Accent glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, var(--terracotta) 0%, transparent 70%)" }}
              />
            </div>

            <div className="relative">
              <h2
                className="animate-fade-in text-3xl font-bold tracking-tight md:text-5xl mb-4"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Ready to take the
                <br />
                next step?
              </h2>
              <p className="animate-fade-in stagger-1 mx-auto max-w-lg text-foreground-muted mb-8">
                Join thousands of professionals and companies already on Jobly.
                Your next opportunity is one click away.
              </p>
              <div className="animate-fade-in stagger-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <button className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta px-8 py-4 text-base font-semibold text-white warm-shadow-md hover:opacity-90 transition-opacity cursor-pointer">
                      Create Free Account
                    </button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <Link
                    href="/jobs"
                    className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta px-8 py-4 text-base font-semibold text-white warm-shadow-md hover:opacity-90 transition-opacity"
                  >
                    Explore Jobs
                  </Link>
                </Authenticated>
                <p className="text-sm text-foreground-muted">
                  Already have an account?{" "}
                  <Unauthenticated>
                    <SignInButton mode="modal">
                      <button className="text-terracotta font-semibold hover:underline cursor-pointer">
                        Sign in
                      </button>
                    </SignInButton>
                  </Unauthenticated>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} Jobly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
