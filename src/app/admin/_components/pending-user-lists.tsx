import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/src/lib/db";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ApproveDialog } from "./approveDialog";
import { DeclineDialog } from "./declineDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown } from "lucide-react";

export default async function PendingUserLists({
  query,
  currentPage,
  sortBy,
  sortOrder,
}: {
  query: string;
  currentPage: number;
  sortBy: string;
  sortOrder: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 10;

  const users = await db.user.findMany({
    where: {
      isApprove: { equals: false },
      OR: [
        { name: { contains: query } },
        { studId: { contains: query } },
        { course: { contains: query } },
        { email: { contains: query } },
        { mobileNumber: { contains: query } },
      ],
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      name: true,
      username: true,
      studId: true,
      course: true,
      email: true,
      mobileNumber: true,
      role: true,
      proofOfID: true,
      createdAt: true,
    },
  });

  const usercounts = await db.user.count({
    where: {
      isApprove: { equals: false },
      OR: [
        { name: { contains: query } },
        { studId: { contains: query } },
        { course: { contains: query } },
        { email: { contains: query } },
        { mobileNumber: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(usercounts / itemsPerPage);

  const SortableHeader = ({ column }: { column: string }) => (
    <Link
      href={`?query=${query}&page=${currentPage}&sortBy=${column}&sortOrder=${
        sortBy === column && sortOrder === "asc" ? "desc" : "asc"
      }`}
      className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Link>
  );

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-2 rounded-md dark:border-white">
        <TableCaption>
          List of Pending Students ({usercounts} total)
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">
              <SortableHeader column="name" />
            </TableHead>
            <TableHead className="w-1/6">
              <SortableHeader column="studId" />
            </TableHead>
            <TableHead className="w-1/6">
              <SortableHeader column="course" />
            </TableHead>
            <TableHead className="w-1/4">
              <SortableHeader column="email" />
            </TableHead>
            <TableHead className="w-1/6">Mobile Number</TableHead>
            <TableHead className="w-1/6 text-center">Academic Status</TableHead>
            <TableHead className="w-1/6 text-center">Attachment</TableHead>
            <TableHead className="w-1/6 text-center">Action</TableHead>
            <TableHead className="w-1/6 text-center">
              <SortableHeader column="createdAt" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[150px] inline-block">
                      {user.name}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="truncate max-w-[100px]">
                {user.studId}
              </TableCell>
              <TableCell className="truncate max-w-[100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[200px] inline-block">
                      {user.course}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.course}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="truncate max-w-[200px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[200px] inline-block">
                      {user.email}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.email}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="truncate max-w-[120px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[200px] inline-block">
                      {user.mobileNumber}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {user.mobileNumber}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Link
                  href={user.proofOfID || "#"}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:underline transition-colors"
                >
                  View
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <ApproveDialog userId={user.id} />
                  <DeclineDialog userId={user.id} />
                </div>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?query=${query}&page=${Math.max(
                  1,
                  currentPage - 1
                )}&sortBy=${sortBy}&sortOrder=${sortOrder}`}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?query=${query}&page=${
                    index + 1
                  }&sortBy=${sortBy}&sortOrder=${sortOrder}`}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href={`?query=${query}&page=${Math.min(
                  totalPages,
                  currentPage + 1
                )}&sortBy=${sortBy}&sortOrder=${sortOrder}`}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
