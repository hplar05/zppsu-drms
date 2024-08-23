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
import { createRequest } from "@/actions/adminRequest";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@/src/utils/uploadthings";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Form() {
  const [imageUrl, setImageUrl] = useState();
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
            <Label htmlFor="course">Email</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter the Number"
              defaultValue={session?.user.email}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter the Number"
              defaultValue={session?.user.mobileNumber}
              disabled
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
          <div>
            <Label htmlFor="attachment">Request Form</Label>
            <UploadDropzone
              endpoint="PdfDocsOrImageUploader"
              onClientUploadComplete={(res: any) => {
                setImageUrl(res[0]?.url);
                if (imageUrl) {
                  toast.success("Image uploaded successfully");
                  console.log(imageUrl);
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
            <Input
              className="hidden"
              id="attachment"
              name="attachment"
              defaultValue={imageUrl}
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
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Link href="/admin/request-table">Cancel</Link>
          </Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
