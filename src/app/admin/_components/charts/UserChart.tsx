import React from "react";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type UserChartProps = {
  data: {
    date: string;
    totalUsers: number;
  }[];
};

const UserChart: React.FC<UserChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalUsers" fill="#8884d8" name="Total Users" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
