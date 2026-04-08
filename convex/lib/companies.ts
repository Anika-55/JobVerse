import { QueryCtx, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

/**
 * Require that a company exists. Throws if not found.
 */
export async function requireCompany(
  ctx: QueryCtx | MutationCtx,
  companyId: Id<"companies">
) {
  const company = await ctx.db.get(companyId);
  if (!company) {
    throw new ConvexError("Company not found");
  }
  return company;
}

/**
 * Check that a membership record exists and has an "active" status.
 * Throws if not found or not active.
 */
export async function requireActiveMembership(
  ctx: QueryCtx | MutationCtx,
  companyId: Id<"companies">,
  userId: Id<"users">
) {
  const membership = await ctx.db
    .query("companyMembers")
    .withIndex("by_companyId_userId", (q) =>
      q.eq("companyId", companyId).eq("userId", userId)
    )
    .unique();

  if (!membership) {
    throw new ConvexError("You are not a member of this company");
  }

  if (membership.status !== "active") {
    throw new ConvexError(
      `Your membership is ${membership.status}. Contact an admin.`
    );
  }

  return membership;
}

/**
 * Check that the user has one of the allowed roles in the company.
 * Throws if role is not in the allowed list.
 */
export async function requireCompanyRole(
  ctx: QueryCtx | MutationCtx,
  companyId: Id<"companies">,
  userId: Id<"users">,
  allowedRoles: Array<"admin" | "recruiter" | "member">
) {
  const membership = await requireActiveMembership(ctx, companyId, userId);

  if (!allowedRoles.includes(membership.role)) {
    throw new ConvexError(
      `This action requires one of the following roles: ${allowedRoles.join(", ")}`
    );
  }

  return membership;
}
