"use client";

import Link from "next/link";
import Image from "next/image";
import React, { SVGProps } from "react";
import { ThemeToggler } from "@/components/Themetoggler";
import Logo from "@/public/logo.jpg";
import NotificationMenu from "@/components/NotificationMenu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import UserAvatar from "@/components/avatar";
import LogoutButton from "../../student/_components/logoutButton";
import { UserCog } from "lucide-react";
import Message from "@mui/icons-material/Message";

const AdminNavbar = () => {
  const pathname = usePathname();

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
    pathname === path
      ? "flex items-center gap-3 rounded-md px-3 py-1 bg-[#800000] text-white transition-colors"
      : "flex items-center gap-3 rounded-md px-3 py-1 transition-colors hover:bg-muted hover:text-foreground";

  return (
    <nav className="z-50 w-full non-prose flex item-center justify-between top-0 dark:bg-transparent dark:border-none bg-white h-auto border-b pb-2">
      <div className="max-md:block justify-center items-center hidden">
        <Sheet>
          <div></div>
          <SheetTrigger asChild className="mt-2 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="dark:bg-[#18191A]">
            <SheetHeader>
              <SheetTitle>
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
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="text-muted-foreground font-medium text-base mt-[1rem]">
                Main
              </div>
              <Link
                href="/admin/dashboard"
                className={linkClasses("/admin/dashboard")}
                prefetch={false}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>

              <Link
                href="/admin/pending-approval-users"
                className={linkClasses("/admin/pending-approval-users")}
                prefetch={false}
              >
                <UserCog className="w-5 h-5" />
                <span>Pending Approval Users</span>
              </Link>

              <Link
                href="/admin/users-table"
                className={linkClasses("/admin/users-table")}
                prefetch={false}
              >
                <UserIcon className="w-5 h-5" />
                <span>User Lists</span>
              </Link>
              <div className="text-muted-foreground font-medium text-base">
                Requests
              </div>
              <Link
                href="/admin/request-table"
                className={linkClasses("/admin/request-table")}
                prefetch={false}
              >
                <FileTextIcon className="h-5 w-5" />
                <span>Pending Requests</span>
              </Link>
              {/* <Link
          href="/admin/approve-requests"
          className={linkClasses("/admin/approve-requests")}
          prefetch={false}
        >
          <CheckIcon className="h-5 w-5" />
          <span>Approve Requests</span>
        </Link> */}
              <Link
                href="/admin/decline-requests"
                className={linkClasses("/admin/decline-requests")}
                prefetch={false}
              >
                <ThumbsDownIcon className="h-5 w-5" />
                <span>Decline Requests</span>
              </Link>
              <Link
                href="/admin/pending-payment"
                className={linkClasses("/admin/pending-payment")}
                prefetch={false}
              >
                <ClockIcon className="w-5 h-5" />
                <span>Pending Payment</span>
              </Link>
              <Link
                href="/admin/paid-requests"
                className={linkClasses("/admin/paid-requests")}
                prefetch={false}
              >
                <WalletIcon className="w-5 h-5" />
                <span>Paid Requests</span>
              </Link>
              <Link
                href="/admin/completed-requests"
                className={linkClasses("/admin/completed-requests")}
                prefetch={false}
              >
                <CheckIconHighlight className="w-5 h-5 bg-black text-white rounded-lg" />
                <span>Completed Requests</span>
              </Link>
              <div className="text-muted-foreground font-medium text-base">
                Others
              </div>
              <Link
                href="/admin/chats"
                className={linkClasses("/admin/chats")}
                prefetch={false}
              >
                <Message className="h-5 w-5" />
                <span>Chats</span>
              </Link>
              <Link href="#" className={linkClasses("#")} prefetch={false}>
                <MegaphoneIcon className="h-5 w-5" />
                <span>Announcements</span>
              </Link>
              <Link href="#" className={linkClasses("#")} prefetch={false}>
                <SettingsIcon className="w-5 h-5" />
                Settings
              </Link>
              <div className="mt-[4rem] w-full">
                <div className="mb-12">
                  <UserAvatar />
                </div>
                <button
                  onClick={SignOut}
                  className="w-full flex items-center gap-3 rounded-md px-3 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <PowerIcon className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Link
        className="space-x-2 flex items-center not-prose p-2 ml-5 max-md:hidden"
        href="/"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={45}
          height={10}
          className="transition-all hover:opacity-75 dark:invert max-md:block hidden"
        />
        <span className="text-lg font-bold text-[#7D0303] max-md:block hidden">
          ZPPSU <span className="text-black dark:text-white">DRMS</span>
        </span>
      </Link>

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
          <div className="max-md:block hidden">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FileTextIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function LayoutDashboardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function MegaphoneIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function PowerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}

function ThumbsDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CheckIconHighlight(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function WalletIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
