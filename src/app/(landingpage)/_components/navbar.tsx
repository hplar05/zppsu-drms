"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/src/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="non-prose scroll-smooth flex item-center justify-between shadow-sm shadow-gray-200 dark:shadow-none sticky top-0 dark:bg-[#020817] bg-white">
      <Link
        className="space-x-2 md:ml-5 ml-0 flex items-center not-prose p-4"
        href="#about"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={55}
          height={10}
          className="transition-all hover:opacity-75 dark:invert"
        ></Image>
      </Link>

      <div className="flex items-center space-x-8 ml-2">
        <div className="text-md hidden md:block non-prose">
          <ul className="flex items-center space-x-4 non-prose">
            <Link className="non-prose" href="#home">
              Home
            </Link>
            <Link className="non-prose" href="#features">
              Features
            </Link>
            <Link className="non-prose" href="#faq">
              FAQ
            </Link>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="text-white"
            >
              Get Started
            </Button>
          </ul>
        </div>
        <div className="p-2">{/* <ThemeToggler /> */}</div>
      </div>
    </header>
  );
};

export default Navbar;
