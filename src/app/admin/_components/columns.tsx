"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteRequestDialog } from "@/components/deleteRequestDialog";

export type Request = {
  id: number;
  studentId: string;
  nameOfStudent: string;
  email: string;
  yearAndsection: string;
  mobileNumber: string;
  course: string;
  purposeOfrequest: string;
  attachment: string | null;
  action:
    | "DECLINE"
    | "PENDING"
    | "PAID"
    | "APPROVE_PENDING_PAYMENT"
    | "COMPLETED";
  // createdAt: Date;
  // updateUt: Date;
  requestChoices: string | null;
};

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nameOfStudent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "yearAndsection",
    header: "Year and Section",
  },
  {
    accessorKey: "course",
    header: "Course",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "purposeOfrequest",
    header: "Purpose of Request",
  },
  {
    accessorKey: "requestChoices",
    header: "Document Type",
  },
  {
    accessorKey: "action",
    header: "Status",
  },

  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  // },

  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Attachment</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`${request.attachment}`}>View Request Form</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/requests/${request.id}`}>
                View Receipt Image
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            {/* <DropdownMenuItem>
              <Link href={`/admin/editRequest/${request.id}`}>Edit</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link href={`/admin/set-status/${request.id}`}>Set Status</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(request.id.toString())
              }
            >
              Copy request ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              {/* <DeleteRequestDialog id={request.id} /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
