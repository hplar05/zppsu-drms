"use client";

import UserAvatar from "@/src/components/Avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const { data: session } = useSession();
  const SignOut = () => {
    try {
      toast.success("Logout Successfully!");
      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex h-auto">
      <nav className="bg-background border-r px-4 py-6 flex flex-col gap-4">
        <UserAvatar />
        <Link
          href="/admin/dashboard"
          className="flex items-center mt-6 gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <LayoutDashboardIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/request-table"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <FileTextIcon className="h-5 w-5" />
          <span>Request Form</span>
        </Link>
        <Link
          href="/admin/approve-forms"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <CheckIcon className="h-5 w-5" />
          <span>Approve Form</span>
        </Link>
        <Link
          href="/admin/disapprove-forms"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <ThumbsDownIcon className="h-5 w-5" />
          <span>Disapprove Form</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          prefetch={false}
        >
          <MegaphoneIcon className="h-5 w-5" />
          <span>Announcements</span>
        </Link>

        <div className="mt-auto">
          <button
            onClick={SignOut}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PowerIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
      <main className="flex-1 p-6" />
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
