import React from "react";
import AdminNavbar from "../_components/adminNavbar";
import ChatInterface from "./ChatInterface";
import { Suspense } from "react";
import AdminChatInterface from "./ChatInterface";

const page = () => {
  return (
    // <div className="max-md:hidden block">
    //   {/* <AdminNavbar /> */}
    <Suspense fallback={<div>Loading...</div>}>
      <AdminChatInterface />
    </Suspense>
    // </div>
  );
};

export default page;
