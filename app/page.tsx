"use client";

import { useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import SiteLogo from "@/components/SiteLogo";

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "For Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const;

const STATS = [
  { value: "12k+", label: "Active Jobs" },
  { value: "8k+", label: "Companies" },
  { value: "95%", label: "Satisfaction" },
  { value: "48h", label: "Avg. Response" },
] as const;

const TRUSTED_LOGOS = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Loom",
] as const;

const FEATURES = [
  {
    icon: "🎯",
    title: "Smart Matching",
    description:
      "Our AI analyzes your skills, experience, and preferences to surface the roles where you'll truly thrive.",
  },
  {
    icon: "⚡",
    title: "Instant Apply",
    description:
      "One profile, one click. Skip repetitive forms and apply to multiple positions in seconds.",
  },
  {
    icon: "📊",
    title: "Application Tracker",
    description:
      "Real-time pipeline view of every application — no more spreadsheet chaos.",
  },
  {
    icon: "🏢",
    title: "Company Profiles",
    description:
      "Deep-dive into culture, team size, funding, tech stack, and employee reviews before you apply.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description:
      "Get notified the moment a role matching your criteria is posted — before the crowd applies.",
  },
  {
    icon: "🤝",
    title: "Hiring Dashboard",
    description:
      "For companies: manage postings, review candidates, and collaborate with your hiring team — all in one place.",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "I landed my dream role at a Series-B startup within two weeks. The smart matching is scarily accurate.",
    name: "Priya Sharma",
    role: "Senior Frontend Engineer",
    company: "at Linear",
  },
  {
    quote:
      "We cut our time-to-hire by 60%. The hiring dashboard keeps everyone aligned without endless Slack threads.",
    name: "Marcus Chen",
    role: "Head of Talent",
    company: "at Vercel",
  },
  {
    quote:
      "Finally, a job board that doesn't feel like it was designed in 2005. Beautiful, fast, and actually useful.",
    name: "Amara Osei",
    role: "Product Designer",
    company: "at Figma",
  },
] as const;

/* ─────────────────────────────────────────────
   LANDING PAGE
   ───────────────────────────────────────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}>
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
                <button className="btn-press inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
                  Sign In
                </button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </Authenticated>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 btn-press"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-foreground transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-foreground transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border animate-slide-up">
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
                    <button className="btn-press w-full rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
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
        <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, var(--success) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            {/* Pill badge */}
            <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground-muted shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
              Now in public beta — 12,000+ jobs listed
            </div>

            {/* Headline */}
            <h1
              className="animate-slide-up stagger-1 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl"
              style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
            >
              Find the career
              <br />
              you <span className="text-gradient">deserve</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-slide-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-foreground-muted md:text-xl leading-relaxed">
              Curated opportunities from the world&apos;s most innovative companies.
              Apply smarter, get hired faster — no noise, no spam, just the right match.
            </p>

            {/* CTA buttons */}
            <div className="animate-slide-up stagger-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Unauthenticated>
                <SignInButton mode="modal">
                  <button className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:shadow-xl transition-shadow">
                    Get Started — It&apos;s Free
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </SignInButton>
              </Unauthenticated>
              <Authenticated>
                <Link
                  href="/jobs"
                  className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:shadow-xl transition-shadow"
                >
                  Browse Jobs
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Authenticated>
              <Link
                href="/companies"
                className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-8 py-4 text-base font-semibold text-foreground hover:border-foreground-muted transition-colors"
              >
                For Companies
              </Link>
            </div>

            {/* Stats row */}
            <div className="animate-slide-up stagger-4 mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ──────────────────── */}
        <section className="border-y border-border bg-muted/50 px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="animate-fade-in text-center text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-8">
              Trusted by teams at
            </p>
            <div className="animate-fade-in stagger-2 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {TRUSTED_LOGOS.map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-foreground-muted/50 hover:text-foreground-muted transition-colors cursor-default select-none"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────── */}
        <section className="px-6 py-24 md:py-32" id="features">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="animate-fade-in text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                Features
              </p>
              <h2
                className="animate-slide-up stagger-1 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Everything you need to
                <br />
                land the perfect role
              </h2>
              <p className="animate-slide-up stagger-2 mx-auto mt-4 max-w-xl text-foreground-muted">
                Whether you&apos;re a candidate looking for your next adventure or a company scaling your team — we&apos;ve got you covered.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`animate-slide-up stagger-${i + 1} card-hover group rounded-2xl border border-border bg-card p-6 shadow-sm`}
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-bricolage)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────── */}
        <section className="bg-muted/30 border-y border-border px-6 py-24 md:py-32" id="how-it-works">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <p className="animate-fade-in text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                How It Works
              </p>
              <h2
                className="animate-slide-up stagger-1 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Three steps to your
                <br />
                next opportunity
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  desc: "Set up your profile once with your skills, experience, and what you're looking for. It takes under 3 minutes.",
                },
                {
                  step: "02",
                  title: "Discover & Apply",
                  desc: "Browse curated listings or let smart matching find roles for you. Apply with a single click.",
                },
                {
                  step: "03",
                  title: "Interview & Land It",
                  desc: "Track your pipeline, prep with company insights, and land the offer. We're with you every step.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className={`animate-slide-up stagger-${i + 2} relative rounded-2xl border border-border bg-card p-8 text-center shadow-sm`}
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <span
                    className="inline-block text-5xl font-bold text-accent/20 mb-4"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-bricolage)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────── */}
        <section className="px-6 py-24 md:py-32" id="testimonials">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="animate-fade-in text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                Testimonials
              </p>
              <h2
                className="animate-slide-up stagger-1 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Loved by people who
                <br />
                love what they do
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`animate-slide-up stagger-${i + 2} card-hover rounded-2xl border border-border bg-card p-6 shadow-sm`}
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4 text-warning">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.47l-3.52 1.88.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    {/* Avatar placeholder */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-foreground-muted">
                        {t.role} <span className="text-accent">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────── */}
        <section className="px-6 py-24 md:py-32">
          <div
            className="mx-auto max-w-4xl rounded-3xl border border-border p-12 md:p-16 text-center relative overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            {/* Accent glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
              />
            </div>

            <div className="relative">
              <h2
                className="animate-slide-up text-3xl font-bold tracking-tight md:text-5xl mb-4"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Ready to find your
                <br />
                next chapter?
              </h2>
              <p className="animate-slide-up stagger-1 mx-auto max-w-lg text-foreground-muted mb-8">
                Join thousands of professionals who&apos;ve already made the switch.
                Your dream role is one click away.
              </p>
              <div className="animate-slide-up stagger-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Unauthenticated>
                  <SignInButton mode="modal">
                    <button className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:shadow-xl transition-shadow">
                      Start for Free
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </SignInButton>
                </Unauthenticated>
                <Authenticated>
                  <Link
                    href="/jobs"
                    className="btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Explore Jobs
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Authenticated>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="border-t border-border bg-card px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand column */}
            <div className="md:col-span-1">
              <SiteLogo />
              <p className="mt-4 text-sm text-foreground-muted leading-relaxed">
                The modern job board for people who care about where they work.
              </p>
            </div>

            {/* Link columns */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">
                Product
              </h4>
              <ul className="flex flex-col gap-2">
                {["Find Jobs", "For Companies", "Pricing", "API"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-2">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-xs text-foreground-muted">
              &copy; {new Date().getFullYear()} Jobly. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* Social icons */}
              {[
                {
                  label: "Twitter",
                  path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                },
                {
                  label: "GitHub",
                  path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
