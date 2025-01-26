import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function UserLists({
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
      isApprove: { equals: true },
      role: {
        in: [
          "STUDENT",
          "GRADUATE_STUDENT",
          "RETURNEES",
          "DROPOUT",
          "SHIFTER",
          "ALUMNI",
          "IRREGULAR",
        ],
      },
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
  });

  const usercounts = await db.user.count({
    where: {
      isApprove: { equals: true },
      role: {
        in: [
          "STUDENT",
          "GRADUATE_STUDENT",
          "RETURNEES",
          "DROPOUT",
          "SHIFTER",
          "ALUMNI",
          "IRREGULAR",
        ],
      },
      OR: [
        { name: { contains: query } },
        { studId: { contains: query } },
        { course: { contains: query } },
        { email: { contains: query } },
        { mobileNumber: { contains: query } },
      ],
    },
  });

  const requestsCount = await db.requestForm.groupBy({
    by: ["userId"],
    where: {
      OR: [
        { nameOfStudent: { contains: query } },
        { studentId: { contains: query } },
        { course: { contains: query } },
        { mobileNumber: { contains: query } },
        { email: { contains: query } },
      ],
    },
    _count: {
      id: true,
    },
  });

  const usersWithRequestCount = users.map((user) => {
    const userRequestCount = requestsCount.find(
      (req) => req.userId === user.id
    );
    return {
      ...user,
      requestCount: userRequestCount ? userRequestCount._count.id : 0,
    };
  });

  const totalPages = Math.ceil(usercounts / itemsPerPage);

  const SortableHeader = ({
    column,
    label,
  }: {
    column: string;
    label: string;
  }) => (
    <Link
      href={`?query=${query}&page=${currentPage}&sortBy=${column}&sortOrder=${
        sortBy === column && sortOrder === "asc" ? "desc" : "asc"
      }`}
      className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Link>
  );

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-2 rounded-md dark:border-white">
        <TableCaption>List of Students ({usercounts} total)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">
              <SortableHeader column="studId" label="Student ID" />
            </TableHead>
            <TableHead className="w-auto">
              <SortableHeader column="name" label="Full Name" />
            </TableHead>
            {/* <TableHead className="w-auto">
              <SortableHeader column="username" label="Username" />
            </TableHead> */}
            <TableHead className="w-auto">
              <SortableHeader column="course" label="Course" />
            </TableHead>
            <TableHead className="w-auto">
              <SortableHeader column="email" label="Email" />
            </TableHead>
            <TableHead className="w-auto">Mobile Number</TableHead>
            <TableHead className="w-auto">Academic Status</TableHead>
            <TableHead className="w-auto">No. of Request</TableHead>
            <TableHead className="w-auto text-center">
              <SortableHeader column="createdAt" label="Created At" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersWithRequestCount.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <TableCell className="truncate max-w-[100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[150px] inline-block">
                      {user.studId}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.studId}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
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
              {/* <TableCell className="truncate max-w-[150px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[150px] inline-block">
                      {user.username}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.username}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell> */}

              <TableCell className="truncate max-w-[100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="truncate max-w-[100px] inline-block">
                      {user.course}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.course}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="truncate max-w-[200px] break-all">
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
              <TableCell className="truncate max-w-[150px]">
                {user.mobileNumber}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.requestCount}</TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`?query=${query}&page=${Math.max(
                        1,
                        currentPage - 1
                      )}&sortBy=${sortBy}&sortOrder=${sortOrder}`}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
