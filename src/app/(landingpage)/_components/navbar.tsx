"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeToggler } from "@/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact Us" },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#5D0202] dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="transition-all hover:opacity-75 dark:invert"
            />
            <span className="text-lg font-bold text-[#c72e2e]">
              ZPPSU <span className="text-white ">DRMS</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#c72e2e] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={() => router.push("/login")}
              className="bg-[#7D0303] text-white hover:bg-[#c72e2e]"
            >
              Get Started
            </Button>
            {/* <ThemeToggler /> */}
          </nav>

          <div className="md:hidden flex items-center">
            {/* <ThemeToggler /> */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon" className="ml-2 bg-transparent">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-[#7D0303] dark:text-gray-300 dark:hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    onClick={() => {
                      router.push("/login");
                      setIsOpen(false);
                    }}
                    className="bg-[#7D0303] text-white hover:bg-[#5D0202]"
                  >
                    Get Started
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
