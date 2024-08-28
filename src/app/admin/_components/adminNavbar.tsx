import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/src/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import NotificationMenu from "@/src/components/NotificationMenu";

const AdminNavbar = async () => {
  return (
    <nav className="z-50 w-full non-prose flex item-center justify-between top-0 dark:bg-transparent dark:border-none bg-white h-auto border-b pb-2">
      <Link
        className="space-x-2 flex items-center not-prose p-2 ml-1"
        href="/"
      ></Link>

      <div className="flex items-center space-x-6 mr-6 z-20">
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            className="relative rounded-full bg-white dark:bg-transparent p1 text-gray-400 hover:text-gray-500 font-bold"
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
    </nav>
  );
};

export default AdminNavbar;
