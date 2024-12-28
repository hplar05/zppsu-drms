import { Suspense } from "react";
import AdminNavbar from "../_components/adminNavbar";
import { fetchDashboardCounts, fetchRequestData } from "./_components/queries";
import DashboardData from "./dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
  const {
    completedCount,
    declinedCount,
    pendingCount,
    requests,
    users,
    usersApproved,
    usersNotApproved,
    nonAdminUsers,
  } = await fetchDashboardCounts();

  const { allRequests, users: userEntries } = await fetchRequestData();

  const aggregatedRequests = allRequests.reduce<{ [key: string]: number }>(
    (acc, { createdAt }) => {
      const date = createdAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const aggregatedUsers = userEntries.reduce<{ [key: string]: number }>(
    (acc, { createdAt }) => {
      if (!createdAt) return acc;
      const date = new Date(createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.keys(aggregatedRequests).map((date) => ({
    date,
    totalRequests: aggregatedRequests[date],
  }));

  const userData = Object.keys(aggregatedUsers).map((date) => ({
    date,
    totalUsers: aggregatedUsers[date],
  }));

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <header className="bg-white dark:bg-transparent shadow-md z-10 mt-2">
          <div className="max-md:hidden block">
            <AdminNavbar />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Overview
            </h1>
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <DashboardData
                completed={completedCount}
                declined={declinedCount}
                totalPending={pendingCount}
                totalRequest={requests}
                totalUsers={users}
                usersApproved={usersApproved}
                usersNotApproved={usersNotApproved}
                nonAdminUsers={nonAdminUsers}
                data={chartData}
                userData={userData}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
