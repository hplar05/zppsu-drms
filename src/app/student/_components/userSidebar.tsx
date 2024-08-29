"use client";

import UserAvatar from "@/src/components/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "@/public/logo.jpg";

export default function Sidebar() {
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

  return (
    <div className="flex h-auto w-auto dark:bg-[#18191A] max-md:hidden">
      <nav className="bg-background border-r px-4 pb-6 pt-3 flex flex-col gap-4 dark:border-none">
        <Link className="space-x-2 flex items-center not-prose" href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={45}
            height={10}
            className="transition-all hover:opacity-75 dark:invert"
          ></Image>
          <span className="text-lg font-bold text-[#7D0303]">
            ZPPSU <span className="text-black dark:text-white">DRMS</span>
          </span>
        </Link>
        <div className="text-muted-foreground font-medium text-base mt-[2rem]">
          Home
        </div>
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-1 transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <LayoutDashboardIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        {/* <div className="text-muted-foreground font-medium text-base">
          Your Requests
        </div>
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-1 transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <FileTextIcon className="h-5 w-5" />
          <span>Pending Requests</span>
        </Link>
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-1  transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <CheckIcon className="h-5 w-5" />
          <span>Approve Requests</span>
        </Link>
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-1 transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <ThumbsDownIcon className="h-5 w-5" />
          <span>Decline Requests</span>
        </Link> */}

        <div className="text-muted-foreground font-medium text-base">
          Others
        </div>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-1  transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <MegaphoneIcon className="h-5 w-5" />
          <span>Announcements</span>
        </Link>

        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 rounded-md px-3 py-1  transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <SettingsIcon className="w-5 h-5" />
          Settings
        </Link>

        <div className="mt-auto w-full">
          <div className="mb-5">
            <UserAvatar />
          </div>
          {/* <button
            onClick={SignOut}
            className="w-full flex items-center gap-3 rounded-md px-3 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PowerIcon className="h-5 w-5" />
            <span>Logout</span>
          </button> */}
        </div>
      </nav>

      <main className="flex" />
    </div>
  );
}

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
