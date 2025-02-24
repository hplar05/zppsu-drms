import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestStatus, RequestStatusData } from "@/src/lib/types/dashboard";

const colors = {
  PENDING: "#EAB308",
  DECLINE: "#FF0000",
  APPROVE_PENDING_PAYMENT: "#F97316",
  PAID: "#A855F7",
  COMPLETED: "#3B82F6",
};

interface RequestStatusChartProps {
  data: RequestStatusData[];
}

export const RequestStatusChart: React.FC<RequestStatusChartProps> = ({
  data,
}) => {
  console.log("RequestStatusChart Data:", data);

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Request Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "4px",
              }}
            />
            <Legend />
            {(Object.keys(colors) as RequestStatus[]).map((status) => (
              <Bar
                key={status}
                dataKey={status}
                stackId="a"
                fill={colors[status]}
                name={status.replace(/_/g, " ")}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
