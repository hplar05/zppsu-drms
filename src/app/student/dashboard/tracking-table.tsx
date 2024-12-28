import { db } from "@/src/lib/db";
import React from "react";
import { columns, Request } from "./columns";
import { DataTable } from "@/src/app/student/dashboard/user-data-table";

async function getRequests(userId: string): Promise<Request[]> {
  const res = await db.requestForm.findMany({
    where: {
      userId: userId,
    },
  });
  return res;
}

export default async function TrackingTable({ userId }: { userId: string }) {
  const requestData = await getRequests(userId);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Your Request Applications
      </h2>
      <DataTable columns={columns} data={requestData} />
    </div>
  );
}
