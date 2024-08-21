import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import RequestLists from "../../_components/requests-list";
import { db } from "@/lib/db";
import NoRequestAvailable from "../../_components/noRequestAvailable";

export default async function RequestTable() {
  const requestAvailable = await db.requestForm.count();

  return (
    <div>
      {requestAvailable === 0 ? (
        <NoRequestAvailable />
      ) : (
        <main className="pt-5 px-5">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">All Request</h1>
            <Button>
              <Link href="/admin/create-request">Create Request</Link>
            </Button>
          </div>

          <Suspense fallback="Loading...">
            <RequestLists />
          </Suspense>
        </main>
      )}
    </div>
  );
}
