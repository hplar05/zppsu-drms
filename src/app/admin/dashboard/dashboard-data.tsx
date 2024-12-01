"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RequestChart } from "../_components/charts/RequestChart";
import SelectRanged from "../_components/charts/SelectRanged";
import UserChart from "../_components/charts/UserChart";

type RangeOptions = "1day" | "7days" | "30days" | "1year" | "max";

interface DashboardDataProps {
  totalRequest: number;
  totalUsers: number;
  totalPending: number;
  completed: number;
  declined: number;
  data: { date: string; totalRequests: number }[];
  userData: { date: string; totalUsers: number }[];
  usersApproved: number;
  usersNotApproved: number;
  nonAdminUsers: number;
}

const filterDataByRange = <T extends { date: string }>(
  data: T[],
  range: RangeOptions
): T[] => {
  if (range === "max") {
    return data;
  }

  const now = new Date();
  const cutoffDate = new Date();

  if (range === "1day") {
    cutoffDate.setDate(now.getDate() - 1);
  } else if (range === "7days") {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (range === "30days") {
    cutoffDate.setDate(now.getDate() - 30);
  } else if (range === "1year") {
    cutoffDate.setFullYear(now.getFullYear() - 1);
  }

  return data.filter(({ date }) => new Date(date) >= cutoffDate);
};

export default function DashboardData({
  totalRequest,
  totalUsers,
  totalPending,
  completed,
  declined,
  data,
  userData,
  usersApproved,
  usersNotApproved,
  nonAdminUsers,
}: DashboardDataProps) {
  const [range, setRange] = useState<RangeOptions>("7days");

  const filteredRequests = filterDataByRange(data, range);
  const filteredUsers = filterDataByRange(userData, range);

  const rangeOptions = [
    { value: "1day", label: "Last 1 Day" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "1year", label: "Last 1 Year" },
    { value: "max", label: "All Time" },
  ];

  return (
    <div>
      <div className="grid h-auto w-full grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Total Request</CardTitle>
            <CardTitle>{totalRequest}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Pending</CardTitle>
            <CardTitle>{totalPending}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Completed</CardTitle>
            <CardTitle>{completed}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Declined</CardTitle>
            <CardTitle>{declined}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Total Users</CardTitle>
            <CardTitle>{totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Approved Users</CardTitle>
            <CardTitle>{usersApproved}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle className="text-[16px]">Approved Users</CardTitle>
            <CardTitle>{usersNotApproved}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="flex justify-end items-center mb-4 mr-6">
        <SelectRanged
          value={range}
          onChange={(value: string) => setRange(value as RangeOptions)}
          options={rangeOptions}
          className="w-40"
        />
      </div>

      <div className="ml-6 grid grid-cols-1 lg:grid-cols-2 gap-4 mr-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <RequestChart data={filteredRequests} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <UserChart data={filteredUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
