"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import type { RequestForm } from "@prisma/client";
import { updateRequest } from "@/actions/adminRequest";
import { useFormState } from "react-dom";

const EditRequestForm = ({ request }: { request: RequestForm }) => {
  const UpdateRequestWithId = updateRequest.bind(null, request.id);
  const [state, formAction] = useFormState(UpdateRequestWithId, null);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Request</CardTitle>
        <CardDescription>Update Request.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfStudent">Name of the Student</Label>
            <Input
              id="nameOfStudent"
              name="nameOfStudent"
              placeholder="Enter your name"
              defaultValue={request.nameOfStudent}
            />
            <div>
              <p className="mt-2 text-sm text-red-500">
                {state?.Error?.nameOfStudent}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                name="course"
                placeholder="Enter the course"
                defaultValue={request.course}
              />
              <div>
                <p className="mt-2 text-sm text-red-500">
                  {state?.Error?.course}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Year & Section</Label>
              <Input
                id="yearAndsection"
                name="yearAndsection"
                placeholder="Enter the your Year and Section"
                defaultValue={request.yearAndsection}
              />
              <div>
                <p className="mt-2 text-sm text-red-500">
                  {state?.Error?.yearAndsection}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student Id</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="Enter your Student ID"
                defaultValue={request.studentId}
              />
              <div>
                <p className="mt-2 text-sm text-red-500">
                  {state?.Error?.studentId}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="course">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter the Number"
                defaultValue={request.email}
              />
              <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter the Number"
                defaultValue={request.mobileNumber}
              />
              <div>
                <p className="mt-2 text-sm text-red-500">
                  {state?.Error?.mobileNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjectname">Request Subject Names</Label>
            <Input
              id="subjectname"
              name="subjectname"
              placeholder="Enter the your Request Subject Names"
              defaultValue={request.subjectname}
            />
            <div>
              <p className="mt-2 text-sm text-red-500">
                {state?.Error?.subjectname}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectname">Purpose of Request</Label>
            <Textarea
              id="purposeOfrequest"
              name="purposeOfrequest"
              placeholder="Enter the Purpose of Request"
              className="min-h-[100px]"
              defaultValue={request.purposeOfrequest}
            />
            <div>
              <p className="mt-2 text-sm text-red-500">
                {state?.Error?.purposeOfrequest}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="mt-2 text-sm text-red-500">{state?.message}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Link href="/admin/request-table">Cancel</Link>
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditRequestForm;
