import React from "react";
import Form from "../../_components/form";
import { createRequest } from "@/actions/actions";

export default async function Page() {
  return (
    <main>
      <h1 className="text-4xl md:text-5xl font-bold"></h1>
      <Form />
    </main>
  );
}
