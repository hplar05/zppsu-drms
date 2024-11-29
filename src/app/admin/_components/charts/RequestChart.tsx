import React from "react";
import {
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

type RequestChartProps = {
  data: {
    date: string;
    totalRequests: number;
  }[];
};

export const RequestChart = ({ data }: RequestChartProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          //   dot={false}
          dataKey="totalRequests"
          type="monotone"
          name="Total Requests"
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
