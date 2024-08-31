import { db } from "@/src/lib/db";
import React from "react";
import { columns, Request } from "./columns";
import { DataTable } from "@/src/app/student/dashboard/user-data-table";
import NoRequestAvailable from "@/components/noRequestAvailable";

// Fetch requests based on the userId
async function getRequests(userId: string): Promise<Request[]> {
  const res = await db.requestForm.findMany({
    where: {
      userId: userId,
    },
  });
  return res;
}

// Page component
export default async function TrackingTable({ userId }: { userId: string }) {
  const requestData = await getRequests(userId);

  return (
    <main className="px-[2rem] py-[3rem]">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-left">
          Your Request Applications
        </h1>
        <DataTable columns={columns} data={requestData} />
      </div>
    </main>
  );
}
