"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Message from "@mui/icons-material/Message";
import Close from "@mui/icons-material/Close";
import UserChatInterface from "@/src/app/student/chat/UserChatInterface";

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="fixed bottom-4 right-7 z-50">
          <button
            className="bg-[#800000] hover:bg-[#e23f3f] text-white font-bold p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Close /> : <Message />}
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 sm:w-96 h-[70vh] p-0 border-none shadow-2xl"
        style={{ marginBottom: "60px" }}
      >
        <div className="w-full h-full overflow-hidden rounded-lg">
          <UserChatInterface />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
