import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import LogoutButton from "./logoutButton";
import NotificationMenu from "@/components/NotificationMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserNavbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full z-50 non-prose flex item-center justify-between top-0 dark:bg-transparent bg-white">
      <Link
        className="space-x-2 flex items-center justify-center not-prose"
        href="/"
      >
        <div className="md:hidden flex justify-center items-center ml-3 gap-2 ">
          <Image
            src={Logo}
            alt="Logo"
            width={45}
            height={10}
            className="transition-all hover:opacity-75 dark:invert"
          />
          <span className="text-lg font-bold text-[#7D0303]">
            ZPPSU <span className="text-black dark:text-white">DRMS</span>
          </span>
        </div>
      </Link>

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
