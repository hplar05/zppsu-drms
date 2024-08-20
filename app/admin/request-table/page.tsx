import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="text-center h-[100vh] pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">All request</h1>
      <Button>
        <Link href="/admin/create-request">Create Request</Link>
      </Button>
    </main>
  );
};

export default page;
