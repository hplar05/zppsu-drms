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
import { createRequest } from "@/actions/studentRequest";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@/src/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentRequestSchema } from "@/src/lib/validation/studentRequestSchema";

export default function StudentRequestForm() {
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [attachmentKey, setAttachmentKey] = useState("");
  const { data: session } = useSession();
  // const [selectedDocument, setSelectedDocument] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentRequestSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // if (selectedDocument) {
    //   formData.append("requestChoice", selectedDocument);
    // }

    if (attachmentUrl) {
      formData.append("attachment", attachmentUrl);
    }
    toast.success("Successfully Submitted");
    await createRequest(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto my-5">
      <CardHeader>
        <CardTitle className="text-center">Create Request</CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to submit your request
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfStudent">Full Name</Label>
            <Input
              id="nameOfStudent"
              placeholder="your full name"
              defaultValue={session?.user.name}
              {...register("nameOfStudent")}
              disabled
            />
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="your Student ID"
                defaultValue={session?.user.studId}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                placeholder="your course"
                defaultValue={session?.user.course}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearAndsection">Year & Section</Label>
              <Input
                id="yearAndsection"
                placeholder="your year&section"
                {...register("yearAndsection")}
              />
              {errors.yearAndsection?.message && (
                <p className="text-red-600">
                  {String(errors.yearAndsection.message)}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="your email"
                defaultValue={session?.user.email}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                placeholder="your Number"
                defaultValue={session?.user.mobileNumber}
                disabled
              />
            </div>
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="subjectname">Request Subject Names</Label>
            <Input
              id="subjectname"
              placeholder="request subject names"
              {...register("subjectname")}
            />
            {errors.subjectname?.message && (
              <p className="text-red-600">
                {String(errors.subjectname.message)}
              </p>
            )}
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="document">Document Type</Label>
            <Input
              id="requestChoices"
              placeholder="document type you request...example Diploma"
              {...register("requestChoices")}
            />
            {errors.requestChoices?.message && (
              <p className="text-red-600">
                {String(errors.requestChoices.message)}
              </p>
            )}
            {/* <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TOR">TOR</SelectItem>
                <SelectItem value="Diploma">DIPLOMA</SelectItem>
                <SelectItem value="Form 137">FORM 137</SelectItem>
                <SelectItem value="Grade Slip">GRADE SLIP</SelectItem>
                <SelectItem value="Request Subject">
                  REQUEST SUBJECTS
                </SelectItem>
              </SelectContent>
            </Select> */}
            {/* <Input id="requestChoices" value={selectedDocument} /> */}
            {/* {errors.requestChoices && (
              <p className="text-red-600">Document Type is required.</p>
            )} */}
          </div>
          <div>
            <Label htmlFor="attachment">Request Form Optional</Label>
            {attachmentUrl.length ? (
              <div className="flex flex-col justify-center items-center">
                <p>Attachment Uploaded</p>
                <Button
                  onClick={() => {
                    setAttachmentUrl("");
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <UploadButton
                  endpoint="PdfDocsOrImageUploader"
                  onClientUploadComplete={(res: any) => {
                    setAttachmentUrl(res[0]?.url);
                    if (attachmentUrl) {
                      toast.success("Image uploaded successfully");
                    }
                    if (res && res.length > 0 && res[0].url) {
                      setAttachmentUrl(res[0].url);
                    } else {
                      console.error("Please input a valid avatar image.", res);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="purposeOfrequest">Purpose of Request</Label>
            <Textarea
              id="purposeOfrequest"
              placeholder="purpose of request"
              className="min-h-[100px]"
              {...register("purposeOfrequest")}
            />
            {errors.purposeOfrequest?.message && (
              <p className="text-red-600">
                {String(errors.purposeOfrequest.message)}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Link href="/student/dashboard">Cancel</Link>
          </Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
