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

export default async function RequestLists() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = await db.requestForm.findMany();
  const requestscounts = await db.requestForm.count();

  return (
    <Table>
      <TableCaption>List of Requests Form</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Name of Student</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Year and Section</TableHead>
          <TableHead>Request Subjects Name</TableHead>
          <TableHead>Purpose of Request</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>{request.studentId}</TableCell>
            <TableCell>{request.nameOfStudent}</TableCell>
            <TableCell>{request.mobileNumber}</TableCell>
            <TableCell>{request.course}</TableCell>
            <TableCell>{request.yearAndsection}</TableCell>
            <TableCell>{request.subjectname}</TableCell>
            <TableCell>{request.purposeOfrequest}</TableCell>
            <TableCell>{request.action}</TableCell>
            <TableCell className="text-right">
              <Button>
                <Link href={`/admin/requests/${request.id}`}>View</Link>
              </Button>
              {/* <Button>
                <Link href={`/admin/editrequests/${request.id}`}>View</Link>
              </Button> */}
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
