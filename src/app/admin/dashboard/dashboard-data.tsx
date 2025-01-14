"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequestChart } from "../_components/charts/RequestChart";
import { RequestStatusChart } from "../_components/charts/RequestStatusChart";
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
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePDF } from "react-to-pdf";

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

  const { toPDF, targetRef } = usePDF({ filename: "dashboard-data.pdf" });

  return (
    <div className="space-y-6" ref={targetRef}>
      {/* <div className="flex justify-between items-center">
        <Button
          onClick={() => toPDF()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={totalRequest}
          icon={Activity}
          color="bg-sky-500"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Requests"
          value={totalPending}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Payments"
          value={totalPendingPayment}
          icon={FileClock}
          color="bg-orange-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Completed Requests"
          value={completed}
          icon={CheckCircle}
          color="bg-blue-500"
        />
        <StatCard
          title="Declined Requests"
          value={declined}
          icon={XCircle}
          color="bg-red-500"
        />
        <StatCard
          title="Total Paid"
          value={totalPaid}
          icon={Activity}
          color="bg-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Users Approved"
          value={usersApproved}
          icon={UserCheck}
          color="bg-teal-500"
        />
        <StatCard
          title="Users Not Approved"
          value={usersNotApproved}
          icon={UserX}
          color="bg-pink-500"
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

      <div className="grid gap-4">
        <RequestStatusChart data={filteredRequests} />
      </div>
    </div>
  );
}

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
