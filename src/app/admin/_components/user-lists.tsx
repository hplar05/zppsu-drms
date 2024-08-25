import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { db } from "@/src/lib/db";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";

export default async function UserLists({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 7;

  const users = await db.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
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
        { email: { contains: query } },
        { mobileNumber: { contains: query } },
      ],
    },
  });

  const fallbackAvatarUrl =
    "https://utfs.io/f/9c2c5025-ae0d-4f81-a5d9-650573f7d0a6-b3d8py.jpg";
  const totalPages = Math.ceil(usercounts / itemsPerPage);

  return (
    <Table className="-z-50">
      <TableCaption>List of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Image</TableHead>
          <TableHead className="w-auto">Name</TableHead>
          <TableHead className="w-auto">Username</TableHead>
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
              </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobileNumber}</TableCell>
            <TableCell>
              <Badge>ZZPSU {user.role}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-center">
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
