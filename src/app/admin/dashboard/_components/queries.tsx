// src/lib/queries.ts
import { db } from "@/src/lib/db";
import { Prisma } from "@prisma/client";

export async function fetchDashboardCounts() {
  const requests = await db.requestForm.count();
  const users = await db.user.count();
  const announcement = await db.announcement.count();

  const completed = await db.requestForm.findMany({
    where: { action: "COMPLETED" },
  });
  const declined = await db.requestForm.findMany({
    where: { action: "DECLINE" },
  });
  const pending = await db.requestForm.findMany({
    where: { action: "PENDING" },
  });

  const pendingpayment = await db.requestForm.findMany({
    where: { action: "APPROVE_PENDING_PAYMENT" },
  });
  const paid = await db.requestForm.findMany({
    where: { action: "PAID" },
  });
  const usersApproved = await db.user.count({ where: { isApprove: true } });
  const usersNotApproved = await db.user.count({ where: { isApprove: false } });

  const nonAdminUsers = await db.user.count({
    where: { role: { notIn: ["ADMIN", "SUPERADMIN"] } },
  });

  return {
    requests,
    users,
    announcement,
    completedCount: completed.length,
    declinedCount: declined.length,
    pendingCount: pending.length,
    paidCount: paid.length,
    pendingPaymentCount: pendingpayment.length,
    usersApproved,
    usersNotApproved,
    nonAdminUsers,
  };
}

export async function fetchRequestData(
  createdAfter?: Date,
  createdBefore?: Date
) {
  const createdAtQuery: Prisma.RequestFormWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const allRequests = await db.requestForm.findMany({
    select: { createdAt: true, action: true },
    where:
      Object.keys(createdAtQuery).length > 0
        ? { createdAt: createdAtQuery }
        : undefined,
  });

  const users = await db.user.findMany({
    select: { createdAt: true },
  });

  return { allRequests, users };
}
