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
      role: "STUDENT",
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
          <TableHead className="w-auto">Image</TableHead>
          <TableHead className="w-auto">Name</TableHead>
          <TableHead className="w-auto">Username</TableHead>
          <TableHead className="w-auto">Student ID</TableHead>
          <TableHead className="w-auto">Course</TableHead>
          <TableHead className="w-auto">Email</TableHead>
          <TableHead className="w-auto">Mobile Number</TableHead>
          <TableHead className="w-auto">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src={user.image ?? fallbackAvatarUrl}
                  alt="@shadcn"
                />
                <AvatarFallback className="text-[0.60rem] text-white  bg-red-400">
                  ZPPSU
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.studId}</TableCell>
            <TableCell>{user.course}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobileNumber}</TableCell>
            <TableCell>
              <Badge>ZPPSU {user.role}</Badge>
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
