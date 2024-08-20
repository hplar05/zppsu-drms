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
            <Label htmlFor="nameOfStudent">Student Id</Label>
            <Input
              id="userId"
              name="userId"
              placeholder="Enter your name"
              defaultValue={session?.user.id}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nameOfStudent">Name of the Student</Label>
            <Input
              id="nameOfStudent"
              name="nameOfStudent"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input id="course" name="course" placeholder="Enter the course" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectname">Subject Names</Label>
            <Textarea
              id="subjectname"
              name="subjectname"
              placeholder="Enter the subject names"
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
