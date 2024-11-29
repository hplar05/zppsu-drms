import { db } from "@/src/lib/db";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
import DashboardData from "./dashboard-data";
import AdminNavbar from "../_components/adminNavbar";

export default async function Dashboard(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  const declineCount = declined.length;
  const completedCount = completed.length;
  const pendingCount = pending.length;

  const createdAtQuery: Prisma.RequestFormWhereInput["createdAt"] = {};
  if (createdAfter instanceof Date) createdAtQuery.gte = createdAfter;
  if (createdBefore instanceof Date) createdAtQuery.lte = createdBefore;

  const allRequests = await db.requestForm.findMany({
    select: { createdAt: true },
    where:
      Object.keys(createdAtQuery).length > 0
        ? { createdAt: createdAtQuery }
        : undefined,
  });

  const allUser = await db.requestForm.findMany({
    select: { createdAt: true },
    where:
      Object.keys(createdAtQuery).length > 0
        ? { createdAt: createdAtQuery }
        : undefined,
  });

  // Type the accumulator explicitly
  const aggregatedData = allRequests.reduce<{ [key: string]: number }>(
    (acc, { createdAt }) => {
      const date = createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    },
    {}
  );
  ``;
  const chartData = Object.keys(aggregatedData).map((date) => ({
    date,
    totalRequests: aggregatedData[date],
  }));

  const userData = Object.keys(aggregatedData).map((date) => ({
    date,
    totalUsers: aggregatedData[date],
  }));

  return (
    <main className="mt-2">
      <div className="max-md:hidden block">
        <AdminNavbar />
      </div>

      <DashboardData
        completed={completedCount}
        declined={declineCount}
        totalPending={pendingCount}
        totalRequest={requests}
        totalUsers={users}
        data={chartData}
      />
    </main>
  );
}
