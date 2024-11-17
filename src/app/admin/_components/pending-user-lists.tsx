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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApproveDialog } from "./approveDialog";
import { DeclineDialog } from "./declineDialog";

export default async function PendingUserLists({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 6;

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
      createdAt: true, // Include createdAt field
    },
  });

  const usercounts = await db.user.count({
    where: {
      OR: [
        { name: { contains: query } },
        { studId: { contains: query } },
        { course: { contains: query } },
        { email: { contains: query } },
        { mobileNumber: { contains: query } },
      ],
    },
  });

  const fallbackAvatarUrl =
    "https://utfs.io/f/9c2c5025-ae0d-4f81-a5d9-650573f7d0a6-b3d8py.jpg";
  const totalPages = Math.ceil(usercounts / itemsPerPage);

  return (
    <Table className="-z-50 border-2 rounded-md dark:border-white">
      <TableCaption>List of Students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Full Name</TableHead>
          {/* <TableHead className="w-auto">Username</TableHead> */}
          <TableHead className="w-auto">Student ID</TableHead>
          <TableHead className="w-auto">Course</TableHead>
          <TableHead className="w-auto">Email</TableHead>
          <TableHead className="w-auto">Mobile Number</TableHead>
          <TableHead className="w-auto">Academic Status</TableHead>
          <TableHead className="w-auto">Attachment</TableHead>
          <TableHead className="text-center">Action</TableHead>
          <TableHead className="text-center">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            {/* <TableCell>{user.username}</TableCell> */}
            <TableCell>{user.studId}</TableCell>
            <TableCell>{user.course}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobileNumber}</TableCell>
            <TableCell>
              <Badge>{user.role}</Badge>
            </TableCell>
            <TableCell className="underline text-center cursor-pointer">
              <Link href={user.proofOfID || "#"}>View</Link>
            </TableCell>
            <TableCell className="flex gap-2">
              <ApproveDialog userId={user.id} />
              <DeclineDialog userId={user.id} />
            </TableCell>
            <TableCell className="text-center">
              {new Date(user.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={12} className="text-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?query=${query}&page=${Math.max(
                      1,
                      currentPage - 1
                    )}`}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`?query=${query}&page=${index + 1}`}
                      isActive={index + 1 === currentPage}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`?query=${query}&page=${Math.min(
                      totalPages,
                      currentPage + 1
                    )}`}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
