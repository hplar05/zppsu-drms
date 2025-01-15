import React from "react";
import AdminNavbar from "../_components/adminNavbar";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] mt-2">
      <div className="max-md:hidden block">
        <AdminNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <h1>Under Development!</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
