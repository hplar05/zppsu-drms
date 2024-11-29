"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { RequestChart } from "../_components/charts/RequestChart";
import { UserChart } from "../_components/charts/UserChart";
import SelectRanged from "../_components/charts/SelectRanged";

type RangeOptions = "1day" | "7days" | "30days" | "1year";

interface DashboardDataProps {
  totalRequest: number;
  totalUsers: number;
  totalPending: number;
  completed: number;
  declined: number;
  data: { date: string; totalRequests: number }[];
}

const filterDataByRange = (
  data: { date: string; totalRequests: number }[],
  range: RangeOptions
) => {
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
  totalPending,
  completed,
  declined,
  data,
}: DashboardDataProps) {
  const [range, setRange] = useState<RangeOptions>("7days");

  const filteredData = filterDataByRange(data, range);

  const rangeOptions = [
    { value: "1day", label: "Last 1 Day" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "1year", label: "Last 1 Year" },
  ];

  return (
    <div>
      <div className="grid h-auto w-full grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle>Total Request</CardTitle>
            <CardTitle>{totalRequest}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle>Pending</CardTitle>
            <CardTitle>{totalPending}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardTitle>{completed}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col text-center dark:bg-transparent">
          <CardHeader>
            <CardTitle>Declined</CardTitle>
            <CardTitle>{declined}</CardTitle>
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
            <RequestChart data={filteredData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>{/* <UserChart data={filteredData} /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
