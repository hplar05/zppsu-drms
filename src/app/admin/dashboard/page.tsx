import { db } from "@/src/lib/db";
import { Suspense } from "react";
import DashboardData from "./dashboard-data";

export default async function Dashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = await db.requestForm.count();
  const users = await db.user.count();
  const announcement = await db.announcement.count();
  const approved = await db.requestForm.findMany({
    where: {
      action: "APPROVE",
    },
  });
  const declined = await db.requestForm.findMany({
    where: {
      action: "DECLINE",
    },
  });
  const declineCount = declined.length;
  const approvedCount = approved.length;

  return (
    <main className="">
      <DashboardData
        approved={approvedCount}
        declined={declineCount}
        totalRequest={requests}
        totalUsers={users}
      />
    </main>
  );
}
