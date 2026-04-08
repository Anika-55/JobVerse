"use client";

import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
} from "lucide-react";

/* ─────────────────────────────────────────────
   STATUS CONFIG
   ───────────────────────────────────────────── */
const STATUS_CONFIG = {
  submitted: { label: "Submitted", badge: "badge-neutral", icon: Clock },
  in_review: { label: "In Review", badge: "badge-warning", icon: Eye },
  accepted: { label: "Accepted", badge: "badge-success", icon: CheckCircle2 },
  rejected: { label: "Rejected", badge: "badge-destructive", icon: XCircle },
  withdrawn: { label: "Withdrawn", badge: "badge-neutral", icon: XCircle },
} as const;

export default function ApplicationsPage() {
  return (
    <div>
      {/* Section intro */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Applications
        </h1>
        <p className="mt-2 text-foreground-muted">
          Track the status of every application you&apos;ve submitted.
        </p>
      </div>

      {/* ── EMPTY STATE ──────────────────── */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
          <FileText className="size-7 text-foreground-muted" />
        </div>
        <h3
          className="text-lg font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          No applications yet
        </h3>
        <p className="text-sm text-foreground-muted max-w-sm mb-6">
          Find your next opportunity — browse jobs and submit your first application.
        </p>
        <Link
          href="/jobs"
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-terracotta text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Search className="size-4" />
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
