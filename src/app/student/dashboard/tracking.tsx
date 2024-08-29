import React from "react";

export const Tracking = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-4 max-w-4xl w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            1
          </div>
          <span className="text-sm font-medium">Pending</span>
        </div>
        <div className="flex-1 h-[2px] bg-muted" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            2
          </div>
          <span className="text-sm font-medium">Approve or Decline</span>
        </div>
        <div className="flex-1 h-[2px] bg-muted" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            3
          </div>
          <span className="text-sm font-medium">Pending Payment</span>
        </div>
        <div className="flex-1 h-[2px] bg-muted" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            4
          </div>
          <span className="text-sm font-medium">Paid</span>
        </div>
        <div className="flex-1 h-[2px] bg-muted" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            5
          </div>
          <span className="text-sm font-medium">Completed</span>
        </div>
      </div>
    </div>
  );
};
