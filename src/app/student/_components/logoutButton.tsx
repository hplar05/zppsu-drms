"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LogoutButton = () => {
  const { data: session } = useSession();
  const SignOut = () => {
    try {
      signOut();
      toast.success("Logout Successfully!");
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
      toast.error("Something went wrong!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger content="end">
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user.image ?? undefined} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="cursor-pointer" onClick={SignOut}>
          Logout
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutButton;
