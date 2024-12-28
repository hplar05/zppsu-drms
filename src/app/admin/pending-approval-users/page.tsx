import React, { Suspense } from "react";
import { db } from "@/src/lib/db";
import Search from "@/components/search";
import RequestListsSkeleton from "./../../../../components/requestTableSkeleton";

import AdminNavbar from "./../_components/adminNavbar";
import PendingUserLists from "../_components/pending-user-lists";

export default async function PendingNewUserTable({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  // const requestAvailable = await db.requestForm.count();

  return (
    <main className="mt-2 z-50">
      <header className="bg-white dark:bg-transparent shadow-md z-10 ">
        <div className="max-md:hidden block mr-4">
          <AdminNavbar />
        </div>
      </header>
      <main className="px-[2rem] py-[3rem] -z-50">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-left">
            Pending New Registered Accounts
          </h1>
          <div className=" flex items-center justify-between gap-2 md:mt-3 mb-6">
            <Search placeholder="Search users..." />
          </div>
        </div>

        <Suspense key={query + currentPage} fallback={<RequestListsSkeleton />}>
          <PendingUserLists query={query} currentPage={currentPage} />
        </Suspense>
      </main>
    </main>
  );
}
