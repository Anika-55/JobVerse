import { QueryCtx, MutationCtx } from "../_generated/server";
import { ConvexError } from "convex/values";

/**
 * Require that the caller is authenticated. Throws if not.
 */
export async function requireIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }
  return identity;
}

/**
 * Look up the users record by the Clerk subject (clerkUserId).
 * Returns null if no record exists yet.
 */
export async function getViewerUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
    .unique();

  return user;
}

/**
 * Look up the users record. Throws if not found.
 */
export async function requireViewerUser(ctx: QueryCtx | MutationCtx) {
  const user = await getViewerUser(ctx);
  if (!user) {
    throw new ConvexError(
      "User record not found. Please try signing out and signing back in."
    );
  }
  return user;
}

/**
 * Get or create the user record on-the-fly.
 * Useful when the webhook hasn't synced yet.
 */
export async function getOrCreateViewerUser(ctx: MutationCtx) {
  const identity = await requireIdentity(ctx);

  // Try to find existing user
  const existing = await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
    .unique();

  if (existing) return existing;

  // Create on-the-fly
  const now = Date.now();
  const userId = await ctx.db.insert("users", {
    clerkUserId: identity.subject,
    email: identity.email ?? "",
    firstName: identity.givenName,
    lastName: identity.familyName,
    imageUrl: identity.pictureUrl,
    createdAt: now,
    updatedAt: now,
  });

  return (await ctx.db.get(userId))!;
}
