import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Message from "@mui/icons-material/Message";

export const FloatingButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed bottom-4 right-7">
          <button className="bg-[#800000] hover:bg-[#e23f3f] text-white font-bold p-4 rounded-full shadow-lg">
            <Message />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-md">
        <div className="flex items-center justify-center">hello</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
