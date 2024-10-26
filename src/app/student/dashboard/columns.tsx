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
import { UploadPaySlipDrawer } from "../_components/uploadPaySlipDrawer";

export type Request = {
  id: number;
  studentId: string;
  nameOfStudent: string;
  email: string;
  purposeOfrequest: string;
  attachment: string | null;
  action:
    | "DECLINE"
    | "PENDING"
    | "PAID"
    | "APPROVE_PENDING_PAYMENT"
    | "COMPLETED";
  adminMessage: string | null;
  requestChoices: string | null;
  payslipUrl: string | null;
  // createdAt: Date;
  // updateUt: Date;
};

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "requestChoices",
    header: "Requesting Form",
  },

  {
    accessorKey: "purposeOfrequest",
    header: "Purpose of Request",
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
              <Link href={`${request.payslipUrl}`}>View Receipt Image</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Action</DropdownMenuLabel>
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
