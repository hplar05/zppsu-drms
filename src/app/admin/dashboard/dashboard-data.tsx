"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { JSX, SVGProps } from "react";
import { BarChart, CartesianGrid, XAxis, Bar } from "recharts";

interface DashboardDataProps {
  totalRequest: number;
  totalUsers: number;
  completed: number;
  declined: number;
}

export default function DashboardData({
  totalRequest,
  totalUsers,
  completed,
  declined,
}: DashboardDataProps) {
  return (
    <div className="grid h-auto w-full grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardDescription>Total Requests</CardDescription>
          <CardTitle>{totalRequest}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle>{totalUsers}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardDescription>Completed</CardDescription>
          <CardTitle>{completed}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardDescription>Decline</CardDescription>
          <CardTitle>{declined}</CardTitle>
        </CardHeader>
      </Card>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex items-center justify-center mt-20 overflow-auto">
        <ChartContainer
          config={{
            requests: { label: "Requests", color: "hsl(var(--chart-1))" },
            completed: { label: "Completed", color: "hsl(var(--chart-2))" },
            decline: { label: "Decline", color: "hsl(var(--chart-3))" },
            pending: { label: "Pending", color: "hsl(var(--chart-4))" },
          }}
          className="min-h-[500px]"
        >
          <BarChart
            accessibilityLayer
            data={[
              {
                name: "Jan",
                requests: 1200,
                completed: 800,
                decline: 200,
                pending: 200,
              },
              {
                name: "Feb",
                requests: 1500,
                completed: 900,
                decline: 300,
                pending: 300,
              },
              {
                name: "Mar",
                requests: 1800,
                completed: 1000,
                decline: 400,
                pending: 400,
              },
              {
                name: "Apr",
                requests: 2000,
                completed: 1200,
                decline: 400,
                pending: 400,
              },
              {
                name: "May",
                requests: 2300,
                completed: 1400,
                decline: 500,
                pending: 400,
              },
              {
                name: "Jun",
                requests: 2500,
                completed: 1500,
                decline: 600,
                pending: 400,
              },
            ]}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="requests"
              fill="var(--color-requests)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completed"
              fill="var(--color-completed)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="decline"
              fill="var(--color-decline)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              fill="var(--color-pending)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function ArrowDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
