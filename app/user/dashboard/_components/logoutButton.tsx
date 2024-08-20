"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LogoutButton = () => {
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
    <Button onClick={SignOut} variant="destructive">
      Logout
    </Button>
  );
};

export default LogoutButton;
