import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import LogoutButton from "./logoutButton";

const UserNavbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="non-prose flex item-center justify-between shadow-sm shadow-gray-200 dark:shadow-none sticky top-0 dark:bg-[#020817] bg-white">
      <Link
        className="space-x-2 md:ml-5 ml-0 flex items-center not-prose p-2"
        href="/"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={45}
          height={10}
          className="transition-all hover:opacity-75 dark:invert"
        ></Image>
      </Link>

      <div className="flex items-center space-x-8 md:mr-5 mr-0">
        <div className="p-2 gap-3">
          <div className="flex justify-center items-center gap-2">
            <ThemeToggler />

            {session?.user ? (
              <LogoutButton />
            ) : (
              <Button>
                <Link href={"/login"}> Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
