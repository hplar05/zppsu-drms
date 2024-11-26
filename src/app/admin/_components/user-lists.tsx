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

export default async function UserLists({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 10;

  const users = await db.user.findMany({
    where: {
      isApprove: { equals: true },
      role: { in: ["STUDENT", "GRADUATE_STUDENT", "RETURNEES", "DROPOUT"] },
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
          {/* <TableHead className="w-auto">Image</TableHead> */}
          <TableHead className="w-auto">Full Name</TableHead>
          <TableHead className="w-auto">Username</TableHead>
          <TableHead className="w-auto">Student ID</TableHead>
          <TableHead className="w-auto">Course</TableHead>
          <TableHead className="w-auto">Email</TableHead>
          <TableHead className="w-auto">Mobile Number</TableHead>
          <TableHead className="w-auto">Academic Status</TableHead>
          <TableHead className="w-auto">No. of Request</TableHead>
          <TableHead className="w-auto text-center">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="truncate max-w-[150px]" title={user.name}>
              {user.name}
            </TableCell>
            <TableCell className="truncate max-w-[150px]" title={user.username}>
              {user.username}
            </TableCell>
            <TableCell className="truncate max-w-[100px]" title={user.studId}>
              {user.studId}
            </TableCell>
            <TableCell className="truncate max-w-[100px]" title={user.course}>
              {user.course}
            </TableCell>
            <TableCell
              className="truncate max-w-[200px] break-all"
              title={user.email}
            >
              {user.email}
            </TableCell>
            <TableCell
              className="truncate max-w-[150px]"
              title={user.mobileNumber}
            >
              {user.mobileNumber}
            </TableCell>
            <TableCell>
              <Badge>{user.role}</Badge>
            </TableCell>
            <TableCell>{/* No. of Request */}</TableCell>
            <TableCell className="text-center">
              {new Date(user.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                // hour: "2-digit",
                // minute: "2-digit",
                // second: "2-digit",
                // hour12: true,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={11} className="text-center">
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
