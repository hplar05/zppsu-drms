import React from "react";

export const Tracking = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Request Status
      </h2>
      <div className="flex items-center justify-between">
        {[
          "Pending",
          "Approve or Decline",
          "Pending Payment",
          "Paid",
          "Completed",
        ].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#800000] hover:bg-[#b74646] text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                {step}
              </span>
            </div>
            {index < 4 && (
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
