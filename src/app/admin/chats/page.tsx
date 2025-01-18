import React from "react";
import AdminNavbar from "../_components/adminNavbar";
import ChatInterface from "./ChatInterface";
import { Suspense } from "react";
import AdminChatInterface from "./ChatInterface";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminChatInterface />
    </Suspense>
  );
};

export default page;
