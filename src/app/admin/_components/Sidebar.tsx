"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import UserAvatar from "@/components/avatar";
import Logo from "@/public/logo.jpg";
import {
  LayoutDashboard,
  Users,
  FileText,
  ThumbsDown,
  Clock,
  Wallet,
  CheckSquare,
  MessageSquare,
  Megaphone,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    category: "Main",
    items: [
      {
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        label: "Admin Dashboard",
      },
      {
        href: "/admin/pending-approval-users",
        icon: Users,
        label: "Pending Approval Users",
      },
      { href: "/admin/users-table", icon: Users, label: "Approve User Lists" },
    ],
  },
  {
    category: "Requests",
    items: [
      {
        href: "/admin/request-table",
        icon: FileText,
        label: "Pending Requests",
      },
      {
        href: "/admin/decline-requests",
        icon: ThumbsDown,
        label: "Decline Requests",
      },
      { href: "/admin/pending-payment", icon: Clock, label: "Pending Payment" },
      { href: "/admin/paid-requests", icon: Wallet, label: "For Approval" },
      {
        href: "/admin/completed-requests",
        icon: CheckSquare,
        label: "Completed Requests",
      },
    ],
  },
  {
    category: "Others",
    items: [
      { href: "/admin/chats", icon: MessageSquare, label: "Chats" },
      { href: "/admin/announcements", icon: Megaphone, label: "Announcements" },
      { href: "/admin/profile", icon: User, label: "Profile" },
    ],
  },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openCategories, setOpenCategories] = useState<string[]>(
    navItems.map((item) => item.category)
  );

  const SignOut = () => {
    try {
      toast.success("Logout Successfully");
      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
      toast.error("Something went wrong!");
    }
  };

  const linkClasses = (path: string) =>
    `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
      pathname === path
        ? "bg-[#800000] text-white"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    } ${isCollapsed ? "justify-center" : ""}`;

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div
      className={`max-md:hidden  flex h-screen bg-white dark:bg-[#18191A] border-r dark:border-gray-800 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <nav className="flex flex-col w-full">
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="Logo"
                width={45}
                height={45}
                className="rounded-full"
              />
              <span className="text-lg font-bold">
                <span className="text-[#7D0303]">ZPPSU</span>{" "}
                <span className="text-black dark:text-white">DRMS</span>
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Separator />
        <ScrollArea className="flex-grow px-3 py-2">
          {navItems.map((category, index) => (
            <Collapsible
              key={index}
              open={openCategories.includes(category.category)}
              onOpenChange={() =>
                !isCollapsed && toggleCategory(category.category)
              }
            >
              <CollapsibleTrigger
                className={`flex items-center justify-between w-full p-2 text-sm font-medium ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                {category.category}
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    openCategories.includes(category.category)
                      ? "transform rotate-90"
                      : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {category.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={linkClasses(item.href)}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </ScrollArea>
        <Separator />

        {!isCollapsed ? (
          <div className="p-4">
            <UserAvatar />
            <Button
              variant="ghost"
              className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-300"
              onClick={SignOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <Avatar>
              <AvatarImage
                src="https://547evqsnjf.ufs.sh/f/168c249e-1c11-4913-b855-74b47a294f41-boiebq.jpg"
                alt="@shadcn"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </nav>
    </div>
  );
}
