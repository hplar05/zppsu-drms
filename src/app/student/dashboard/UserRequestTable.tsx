import React, { Suspense } from "react";
import { db } from "@/src/lib/db";
import Search from "@/components/search";
import RequestListsSkeleton from "@/components/requestTableSkeleton";
import UserRequestLists from "../_components/UserRequestTable";

export default async function PendingNewUserTable({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  // const requestAvailable = await db.requestForm.count();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Your Request Applications
      </h2>
      <Suspense key={query + currentPage} fallback={<RequestListsSkeleton />}>
        <UserRequestLists query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
