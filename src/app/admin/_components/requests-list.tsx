import { Button } from "@/src/components/ui/button";
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
import Link from "next/link";
import { DeleteRequestDialog } from "../../../components/DeleteRequestDialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { ActionRequest } from "./ActionRequest";

export default async function RequestLists({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const itemsPerPage = 7;

  const requests = await db.requestForm.findMany({
    where: {
      OR: [
        { nameOfStudent: { contains: query } },
        { studentId: { contains: query } },
        { email: { contains: query } },
        { course: { contains: query } },
        { subjectname: { contains: query } },
      ],
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const requestscounts = await db.requestForm.count({
    where: {
      OR: [
        { nameOfStudent: { contains: query } },
        { studentId: { contains: query } },
        { email: { contains: query } },
        { course: { contains: query } },
        { subjectname: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(requestscounts / itemsPerPage);

  return (
    <Table>
      <TableCaption>List of Requests Form</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[110px]">Student ID</TableHead>
          <TableHead className="w-[150px]">Name of Student</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Course</TableHead>
          <TableHead className="w-[150px]">Year and Section</TableHead>
          {/* <TableHead>Request Subjects Name</TableHead> */}
          <TableHead>Purpose of Request</TableHead>
          <TableHead>Attachment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
          <TableCell className=""></TableCell>
          <TableHead className="text-right flex justify-center items-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.studentId}</TableCell>
            <TableCell>{request.nameOfStudent}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>{request.mobileNumber}</TableCell>
            <TableCell>{request.course}</TableCell>
            <TableCell>{request.yearAndsection}</TableCell>
            {/* <TableCell>{request.subjectname}</TableCell> */}
            <TableCell>{request.purposeOfrequest}</TableCell>
            <TableCell>
              <Link href={`/admin/requests/${request.id}`}>
                <Button variant="outline">View</Button>
              </Link>
            </TableCell>
            <TableCell>{request.action}</TableCell>
            <TableCell className="text-right">
              <ActionRequest />
            </TableCell>
            <TableCell className="text-right flex justify-center items-center gap-1">
              <Link href={`/admin/editRequest/${request.id}`}>
                <Button>Edit</Button>
              </Link>
              <DeleteRequestDialog id={request.id} />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={13} className="text-center">
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
