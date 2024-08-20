"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createRequest } from "@/actions/actions";
import { useSession } from "next-auth/react";

export default function Form() {
  const { data: session } = useSession();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create Request</CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to add request
        </CardDescription>
      </CardHeader>
      <form action={createRequest}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfStudent">Name of the Student</Label>
            <Input
              id="nameOfStudent"
              name="nameOfStudent"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student Id</Label>
            <Input
              id="studentId"
              name="studentId"
              placeholder="Enter your Student ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter the Number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input id="course" name="course" placeholder="Enter the course" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Year & Section</Label>
            <Input
              id="yearAndsection"
              name="yearAndsection"
              placeholder="Enter the your Year and Section"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectname">Request Subject Names</Label>
            <Input
              id="subjectname"
              name="subjectname"
              placeholder="Enter the your Request Subject Names"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectname">Purpose of Request</Label>
            <Textarea
              id="purposeOfrequest"
              name="purposeOfrequest"
              placeholder="Enter the Purpose of Request"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
