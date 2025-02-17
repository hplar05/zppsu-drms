import { Suspense } from "react";
import AdminNavbar from "../_components/adminNavbar";
import { fetchDashboardCounts, fetchRequestData } from "./_components/queries";
import DashboardData from "./dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
  // Fetching the counts and request data
  const {
    completedCount,
    declinedCount,
    pendingCount,
    paidCount,
    pendingPaymentCount,
    requests,
    users,
    usersApproved,
    usersNotApproved,
    nonAdminUsers,
  } = await fetchDashboardCounts();

  const { allRequests, users: userEntries } = await fetchRequestData();

  // Aggregating requests by date and action
  const aggregatedRequests = allRequests.reduce<{
    [key: string]: {
      PENDING: number;
      DECLINE: number;
      APPROVE_PENDING_PAYMENT: number;
      PAID: number;
      COMPLETED: number;
    };
  }>((acc, { createdAt, action }) => {
    const date = createdAt.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        PENDING: 0,
        DECLINE: 0,
        APPROVE_PENDING_PAYMENT: 0,
        PAID: 0,
        COMPLETED: 0,
      };
    }
    acc[date][action as keyof (typeof acc)["date"]]++;
    return acc;
  }, {});

  // Aggregating users by date
  const aggregatedUsers = userEntries.reduce<{ [key: string]: number }>(
    (acc, { createdAt }) => {
      if (!createdAt) return acc;
      const date = new Date(createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  // Mapping aggregated data into chart-compatible format
  const chartData = Object.keys(aggregatedRequests).map((date) => ({
    date,
    totalRequests: Object.values(aggregatedRequests[date]).reduce(
      (a, b) => a + b,
      0
    ),
    PENDING: aggregatedRequests[date].PENDING || 0,
    DECLINE: aggregatedRequests[date].DECLINE || 0,
    APPROVE_PENDING_PAYMENT:
      aggregatedRequests[date].APPROVE_PENDING_PAYMENT || 0,
    PAID: aggregatedRequests[date].PAID || 0,
    COMPLETED: aggregatedRequests[date].COMPLETED || 0,
  }));

  const userData = Object.keys(aggregatedUsers).map((date) => ({
    date,
    totalUsers: aggregatedUsers[date],
  }));

  return (
    <div className="min-h-screen z-50">
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
                totalPaid={paidCount}
                totalPendingPayment={pendingPaymentCount}
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
