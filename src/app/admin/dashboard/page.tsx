import { db } from "@/src/lib/db";
import { Suspense } from "react";
import DashboardData from "./dashboard-data";
import AdminNavbar from "../_components/adminNavbar";

export default async function Dashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = await db.requestForm.count();
  const users = await db.user.count();
  const announcement = await db.announcement.count();
  const completed = await db.requestForm.findMany({
    where: {
      action: "COMPLETED",
    },
  });
  const declined = await db.requestForm.findMany({
    where: {
      action: "DECLINE",
    },
  });
  const declineCount = declined.length;
  const completedCount = completed.length;

  return (
    <main className="mt-2">
      <AdminNavbar />
      <DashboardData
        completed={completedCount}
        declined={declineCount}
        totalRequest={requests}
        totalUsers={users}
      />
    </main>
  );
}
