import React from "react";
import Form from "../_components/form";
import { createRequest } from "@/actions/actions";

export default async function Page() {
  return (
    <main className="h-[100vh] pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5"></h1>
      <Form />
    </main>
  );
}
