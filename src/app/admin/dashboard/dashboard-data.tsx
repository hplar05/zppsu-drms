"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RequestChart } from "../_components/charts/RequestChart";
import SelectRanged from "../_components/charts/SelectRanged";
import UserChart from "../_components/charts/UserChart";
import {
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  UserX,
  FileClock,
  PhilippinePeso,
} from "lucide-react";
import { motion } from "framer-motion";

type RangeOptions = "1day" | "7days" | "30days" | "1year" | "max" | "custom";

interface DashboardDataProps {
  totalRequest: number;
  totalUsers: number;
  totalPending: number;
  completed: number;
  declined: number;
  totalPendingPayment: number;
  totalPaid: number;
  data: { date: string; totalRequests: number }[];
  userData: { date: string; totalUsers: number }[];
  usersApproved: number;
  usersNotApproved: number;
  nonAdminUsers: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const filterDataByRange = <T extends { date: string }>(
  data: T[],
  range: RangeOptions,
  startDate?: Date,
  endDate?: Date
): T[] => {
  if (range === "max") {
    return data;
  }

  const now = new Date();
  let cutoffDate = new Date();

  if (range === "custom" && startDate && endDate) {
    return data.filter(
      ({ date }) => new Date(date) >= startDate && new Date(date) <= endDate
    );
  }

  switch (range) {
    case "1day":
      cutoffDate.setDate(now.getDate() - 1);
      break;
    case "7days":
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case "30days":
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case "1year":
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  return data.filter(({ date }) => new Date(date) >= cutoffDate);
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Card className={`bg-gradient-to-br ${color} text-white`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardData({
  totalRequest,
  totalUsers,
  totalPending,
  totalPendingPayment,
  totalPaid,
  completed,
  declined,
  data,
  userData,
  usersApproved,
  usersNotApproved,
  nonAdminUsers,
}: DashboardDataProps) {
  const [range, setRange] = useState<RangeOptions>("7days");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const rangeOptions = [
    { value: "1day", label: "Last 1 Day" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "1year", label: "Last 1 Year" },
    { value: "max", label: "All Time" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleRangeChange = (value: string, start?: Date, end?: Date) => {
    setRange(value as RangeOptions);
    setStartDate(start);
    setEndDate(end);
  };

  const filteredRequests = filterDataByRange(data, range, startDate, endDate);
  const filteredUsers = filterDataByRange(userData, range, startDate, endDate);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Requests"
          value={totalRequest}
          icon={Activity}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Pending Request"
          value={totalPending}
          icon={Clock}
          color="from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Declined Request"
          value={declined}
          icon={XCircle}
          color="from-red-500 to-red-600"
        />
        <StatCard
          title="Pending Payment Request"
          value={totalPendingPayment}
          icon={FileClock}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Paid Request"
          value={totalPaid}
          icon={PhilippinePeso}
          color="from-pink-500 to-pink-600"
        />
        <StatCard
          title="Completed Request"
          value={completed}
          icon={CheckCircle}
          color="from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Approved Users"
          value={usersApproved}
          icon={UserCheck}
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Not Approved Users"
          value={usersNotApproved}
          icon={UserX}
          color="from-red-500 to-red-600"
        />
      </div>

      <div className="flex justify-end items-center mb-4">
        <SelectRanged
          value={range}
          onChange={handleRangeChange}
          options={rangeOptions}
          className="w-40"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <RequestChart data={filteredRequests} />
        </Card>

        <Card>
          <UserChart data={filteredUsers} />
        </Card>
      </div>
    </div>
  );
}
