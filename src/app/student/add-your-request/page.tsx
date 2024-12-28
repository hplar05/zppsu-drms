import React from "react";
import StudentRequestForm from "../_components/studentRequestForm";

const AddRequestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Create New Request
        </h1>
        <StudentRequestForm />
      </div>
    </div>
  );
};

export default AddRequestPage;
