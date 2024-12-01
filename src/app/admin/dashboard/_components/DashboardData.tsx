// src/components/admin/DashboardData.tsx

import UserChart from "../../_components/charts/UserChart";

interface DashboardDataProps {
  completed: number;
  declined: number;
  totalPending: number;
  totalRequest: number;
  totalUsers: number;
  usersApproved: number;
  usersNotApproved: number;
  nonAdminUsers: number;
  data: { date: string; totalRequests: number }[];
  userData: { date: string; totalUsers: number }[];
}

const DashboardData: React.FC<DashboardDataProps> = ({
  completed,
  declined,
  totalPending,
  totalRequest,
  totalUsers,
  usersApproved,
  usersNotApproved,
  nonAdminUsers,
  data,
  userData,
}) => (
  <div className="dashboard-data">
    <div>
      <p>Completed: {completed}</p>
      <p>Declined: {declined}</p>
      <p>Pending: {totalPending}</p>
      <p>Total Requests: {totalRequest}</p>
      <p>Total Users: {totalUsers}</p>
      <p>Approved Users: {usersApproved}</p>
      <p>Not Approved Users: {usersNotApproved}</p>
      <p>Non-Admin Users: {nonAdminUsers}</p>
    </div>
    <UserChart data={userData} />
  </div>
);

export default DashboardData;
