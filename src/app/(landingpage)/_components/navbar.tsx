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
    <header className="scroll-smooth flex item-center justify-between shadow-gray-200   bg-[#800000f1] top-0 sticky z-50">
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
        />
      </Link>

      <div className="flex items-center space-x-8 ml-2">
        <div className="text-md hidden md:block  mr-8">
          <ul className="flex items-center space-x-4">
            <Link className="text-white hover:underline" href="#home">
              Home
            </Link>
            <Link className="text-white hover:underline" href="#about">
              About Us
            </Link>
            <Link className="text-white hover:underline" href="#features">
              Features
            </Link>
            <Link className="text-white hover:underline" href="#faq">
              FAQ
            </Link>
            <Link className="text-white hover:underline" href="#contact">
              Contact Us
            </Link>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="text-white bg-[#800000]"
            >
              Get Started
            </Button>
          </ul>
        </div>
        <div className="p-2 max-md:block hidden  cursor-pointer ">
          <Sheet>
            <SheetTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 mr-[1rem] text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="border-b pb-4">
                <div className="flex justify-center items-center">
                  <Link
                    className="space-x-2 flex items-center not-prose"
                    href="/"
                  >
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={45}
                      height={10}
                      className="transition-all hover:opacity-75 dark:invert"
                    />
                    <span className="text-lg font-bold text-[#7D0303]">
                      ZPPSU{" "}
                      <span className="text-black dark:text-white">DRMS</span>
                    </span>
                  </Link>
                </div>
              </SheetTitle>
              <ul className="flex flex-col items-center space-y-4 gap-7 mt-[3rem] ">
                <Link className=" " href="#home">
                  Home
                </Link>
                <Link className=" " href="#about">
                  About Us
                </Link>
                <Link className=" " href="#features">
                  Features
                </Link>
                <Link className=" " href="#faq">
                  FAQ
                </Link>
                <Link className=" " href="#contact">
                  Contact Us
                </Link>
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="text-white bg-[#800000]"
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
