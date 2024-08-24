import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/src/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import NotificationMenu from "@/src/components/NotificationMenu";

const AdminNavbar = async () => {
  return (
    <header className="w-full non-prose flex item-center justify-between border-b  sticky top-0 dark:bg-[#020817] bg-white">
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

      <div className="flex items-center space-x-6 md:mr-5 mr-0">
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            className="relative rounded-full bg-white p1 text-gray-400 hover:text-gray-500 font-bold"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notification</span>
            <div className="z-20">
              <NotificationMenu />
            </div>
          </button>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
