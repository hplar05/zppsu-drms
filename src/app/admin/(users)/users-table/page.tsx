import React, { Suspense } from "react";
import { db } from "@/src/lib/db";
import Search from "@/components/search";
import RequestListsSkeleton from "@/components/requestTableSkeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminNavbar from "../../_components/adminNavbar";
import UserLists from "../../_components/user-lists";

export default async function RequestTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy || "createdAt";
  const sortOrder = searchParams?.sortOrder || "desc";
  const requestAvailable = await db.requestForm.count();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#121212] mt-2">
      <div className="max-md:hidden block">
        <AdminNavbar />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#121212] rounded-lg shadow-lg p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Approve User Lists
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Search placeholder="Search students..." />
          </div>
          <Suspense
            key={query + currentPage + sortBy + sortOrder}
            fallback={<RequestListsSkeleton />}
          >
            <UserLists
              query={query}
              currentPage={currentPage}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </Suspense>
        </div>
      </main>
    </main>
  );
}
