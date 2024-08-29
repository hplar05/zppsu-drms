import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/src/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";
import LogoutButton from "./logoutButton";
import NotificationMenu from "@/src/components/NotificationMenu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const UserNavbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full z-50 non-prose flex item-center justify-between top-0 dark:bg-transparent bg-white">
      <Link
        className="space-x-2 flex items-center not-prose p-2 mx-5 mr-1"
        href="/"
      ></Link>

      <div className="flex items-center space-x-6 max-md:mr-4 mr-3 z-20">
        <div className="p-2 gap-5">
          <div className="flex justify-center items-center gap-2">
            {session?.user ? (
              <div className="gap-2 flex items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white dark:bg-transparent p1 text-gray-400 hover:text-gray-500 font-bold"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notification</span>
                  <NotificationMenu />
                </button>
                <ThemeToggler />
                <LogoutButton />
              </div>
            ) : (
              <Button>
                <Link href={"/login"}> Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
