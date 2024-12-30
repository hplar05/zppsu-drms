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
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UserRequestLists({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 10;
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You need to log in to view your requests.</p>;
  }

  const requests = await db.requestForm.findMany({
    where: {
      userId: session.user.id,
      OR: [
        { nameOfStudent: { contains: query, mode: "insensitive" } },
        { requestChoices: { contains: query, mode: "insensitive" } },
        { purposeOfrequest: { contains: query, mode: "insensitive" } },
        { requestChoices: { contains: query, mode: "insensitive" } },
      ],
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    select: {
      id: true,
      nameOfStudent: true,
      course: true,
      purposeOfrequest: true,
      action: true,
      requestChoices: true,
    },
  });

  // Count total requests for pagination
  const requestCount = await db.requestForm.count({
    where: {
      userId: session.user.id,
      OR: [
        { nameOfStudent: { contains: query, mode: "insensitive" } },
        { requestChoices: { contains: query, mode: "insensitive" } },
        { purposeOfrequest: { contains: query, mode: "insensitive" } },
        { requestChoices: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  const totalPages = Math.ceil(requestCount / itemsPerPage);

  return (
    <Table className="-z-50 border-2 rounded-md dark:border-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Requesting Form</TableHead>
          <TableHead className="w-1/6">Purpose of Request</TableHead>
          <TableHead className="w-1/6">Status</TableHead>
          <TableHead className="w-1/6">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell
              className="truncate max-w-[150px]"
              title={request.requestChoices ?? ""}
            >
              {request.requestChoices}
            </TableCell>
            <TableCell
              className="truncate max-w-[100px]"
              title={request.purposeOfrequest}
            >
              {request.purposeOfrequest}
            </TableCell>

            <TableCell
              className="truncate max-w-[100px]"
              title={request.action}
            >
              {request.action}
            </TableCell>
            <TableCell
              className="truncate max-w-[100px]"
              title="Upload Receipt"
            >
              <Link href={`/student/uploadpayslip/${request.id}`}>
                <Button className="bg-[#800000] hover:bg-[#b74646] text-white">
                  Upload Receipt
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-center">
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
