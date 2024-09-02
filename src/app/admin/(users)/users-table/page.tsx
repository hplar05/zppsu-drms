import React, { Suspense } from "react";
import { db } from "@/src/lib/db";
import NoRequestAvailable from "../../../../../components/noRequestAvailable";
import Search from "@/components/search";
import RequestListsSkeleton from "../../../../../components/requestTableSkeleton";
import UserLists from "../../_components/user-lists";
import AdminNavbar from "../../_components/adminNavbar";

export default async function RequestTable({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const requestAvailable = await db.requestForm.count();

  return (
    <main className="mt-2 z-50">
      <div className="max-md:hidden block">
        <AdminNavbar />
      </div>
      <main className="px-[2rem] py-[3rem] -z-50">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-left">All Users</h1>
          <div className=" flex items-center justify-between gap-2 md:mt-3 mb-6">
            <Search placeholder="Search users..." />
          </div>
        </div>

        <Suspense key={query + currentPage} fallback={<RequestListsSkeleton />}>
          <UserLists query={query} currentPage={currentPage} />
        </Suspense>
      </main>
    </main>
  );
}
