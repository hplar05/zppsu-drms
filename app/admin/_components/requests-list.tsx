import { Button } from "@/components/ui/button";
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
import { db } from "@/lib/db";
import Link from "next/link";
import { DeleteRequestDialog } from "./deleteRequestDialog";

export default async function RequestLists() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = await db.requestForm.findMany();
  const requestscounts = await db.requestForm.count();

  return (
    <Table>
      <TableCaption>List of Requests Form</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student ID</TableHead>
          <TableHead>Name of Student</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Year and Section</TableHead>
          <TableHead>Request Subjects Name</TableHead>
          <TableHead>Purpose of Request</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right flex justify-center items-center">
            Actions
          </TableHead>
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
            <TableCell>{request.subjectname}</TableCell>
            <TableCell>{request.purposeOfrequest}</TableCell>
            <TableCell>{request.action}</TableCell>
            <TableCell className="text-right flex justify-center items-center gap-1">
              <Button variant="outline">
                <Link href={`/admin/requests/${request.id}`}>View</Link>
              </Button>
              <Button>
                <Link href={`/admin/editRequest/${request.id}`}>Edit</Link>
              </Button>
              <DeleteRequestDialog id={request.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={12}>Total</TableCell>
          <TableCell className="text-right">{requestscounts}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
