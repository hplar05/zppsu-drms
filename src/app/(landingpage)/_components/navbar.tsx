"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ThemeToggler } from "@/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        <div className="text-md hidden md:block non-prose mr-8">
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
        <div className="p-2 max-md:block hidden max-md:mr-2 cursor-pointer">
          <Sheet>
            <SheetTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent>
              <ul className="flex flex-col items-center space-y-4 gap-7 non-prose mb-8">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
