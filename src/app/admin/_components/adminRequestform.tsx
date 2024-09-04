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
import { createRequest } from "@/actions/adminRequest";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@/src/lib/utils";
import toast from "react-hot-toast";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminCreateRequestSchema } from "@/src/lib/validation/adminCreateRequestSchema";

// Define schema validation with zod

export default function Form() {
  const [isPending, startTransition] = useTransition();
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [attachmentKey, setAttachmentKey] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AdminCreateRequestSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (attachmentUrl) {
      formData.append("attachment", attachmentUrl);
    }
    startTransition(() => {
      createRequest(formData);
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-3">
      <CardHeader>
        <CardTitle className="text-center">Create Request</CardTitle>
        <CardDescription className="text-center">
          Fill out the request input below to add the request
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfStudent">Name of the Student</Label>
            <Input
              id="nameOfStudent"
              placeholder="full name..."
              {...register("nameOfStudent")}
            />
            {errors.nameOfStudent?.message && (
              <p className="text-red-600">
                {String(errors.nameOfStudent.message)}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student Id</Label>
              <Input
                id="studentId"
                placeholder="student ID..."
                {...register("studentId")}
              />
              {errors.studentId?.message && (
                <p className="text-red-600">
                  {String(errors.studentId.message)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                placeholder="student course..."
                {...register("course")}
              />
              {errors.course?.message && (
                <p className="text-red-600">{String(errors.course.message)}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearAndsection">Year & Section</Label>
              <Input
                id="yearAndsection"
                placeholder="year&section..."
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
                placeholder="email address..."
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-red-600">{String(errors.email.message)}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                placeholder="mobile number..."
                {...register("mobileNumber")}
              />
              {errors.mobileNumber?.message && (
                <p className="text-red-600">
                  {String(errors.mobileNumber.message)}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestChoices">Document Type</Label>
            <Input
              id="requestChoices"
              placeholder="document type... example Diploma"
              {...register("requestChoices")}
            />
            {errors.requestChoices?.message && (
              <p className="text-red-600">
                {String(errors.requestChoices.message)}
              </p>
            )}
          </div>
          <div className="mx-auto">
            <Label htmlFor="attachment">
              Request Form of the student Optional
            </Label>
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
              <div className="mt-4">
                <UploadButton
                  appearance={{
                    button: {
                      background: "#800000",
                      color: "white",
                    },
                  }}
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
              placeholder="purpose of request..."
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
            <Link href="/admin/request-table">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
