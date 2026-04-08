import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────
   ROUTE MATCHERS
   ───────────────────────────────────────────── */

// Public — no auth required
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing",
]);

// Candidate routes — require sign-in
const isCandidateRoute = createRouteMatcher([
  "/server",
  "/jobs(.*)",
  "/applications(.*)",
  "/favorites(.*)",
  "/profile(.*)",
]);

// Company routes — require sign-in + organization
const isCompanyRoute = createRouteMatcher(["/company(.*)"]);

/* ─────────────────────────────────────────────
   MIDDLEWARE HANDLER
   ───────────────────────────────────────────── */
export default clerkMiddleware(async (auth, req) => {
  // Public routes — let through
  if (isPublicRoute(req)) return;

  // Candidate routes — just need sign-in
  if (isCandidateRoute(req)) {
    await auth.protect();
    return;
  }

  // Company routes — need sign-in + org + valid role
  if (isCompanyRoute(req)) {
    const { orgId, has } = await auth.protect();

    // No organization → redirect to pricing with reason
    if (!orgId) {
      const url = new URL("/pricing", req.url);
      url.searchParams.set("reason", "org_required");
      return NextResponse.redirect(url);
    }

    // Check for a valid org role
    const hasValidRole =
      has({ role: "org:admin" }) ||
      has({ role: "org:recruiter" }) ||
      has({ role: "org:member" });

    if (!hasValidRole) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return;
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
