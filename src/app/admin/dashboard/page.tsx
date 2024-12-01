import AdminNavbar from "../_components/adminNavbar";
import { fetchDashboardCounts, fetchRequestData } from "./_components/queries";
import DashboardData from "./dashboard-data";

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
      if (!createdAt) return acc; // Skip invalid entries
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
    <main className="mt-2">
      <div className="max-md:hidden block">
        <AdminNavbar />
      </div>
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
    </main>
  );
}
