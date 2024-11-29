import React from "react";
import {
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   { value: 12, date: "2024-12-12" },
//   { value: 15, date: "2024-12-11" },
//   { value: 23, date: "2024-12-10" },
//   { value: 1, date: "2024-12-10" },
// ];

type UserChartProps = {
  data: {
    date: string;
    totalUser: number;
  }[];
};

export const UserChart = ({ data }: UserChartProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          //   dot={false}
          dataKey="totalUsers"
          type="monotone"
          name="Total Users"
          stroke="hsl(var(--primary))"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
