"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { StudentRequestSchema } from "@/src/lib/validation/studentRequestSchema";
import { createRequest } from "@/actions/studentRequest";
import { UploadButton } from "@/src/lib/utils";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

const documentTypes = [
  "Bulk Request",
  "Enrollment Form",
  "Diploma",
  "TOR",
  "Report of Grades",
  "Certificate of Transfer",
  "Application of Cross Enrollment",
  "Certificate of Enrollment",
  "Request Form for Students Permanent Record",
  "Evaluation Form",
  "Request Form for Document Issurance",
  "Students List",
  "College Students Permanent Record",
  "Application Form for Graduation",
  "Completion Removal Form",
  "Prospectus",
  "Enrollment List",
];

export default function StudentRequestForm() {
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [otherDocument, setOtherDocument] = useState("");
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(StudentRequestSchema),
    mode: "onChange",
  });

  const selectedRequestType = watch("requestChoices");
  const isBulkRequest = selectedRequestType === "Bulk Request";

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "requestChoices" && isBulkRequest) {
        const bulkRequests = [...selectedRequests];
        if (otherDocument) {
          bulkRequests.push(otherDocument);
        }
        formData.append(key, JSON.stringify(bulkRequests));
      } else {
        formData.append(key, data[key]);
      }
    });

    if (attachmentUrl) {
      formData.append("attachment", attachmentUrl);
    }
    if (receiptUrl) {
      formData.append("receipt", receiptUrl);
    }

    try {
      await createRequest(formData);
      toast.success("Request submitted successfully");
    } catch (error) {
      toast.error("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl">Student Request Form</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Please fill out the form below to submit your request
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8 mt-6">
          {/* Personal Information Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                1
              </span>
              Personal Information
            </h3>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nameOfStudent">Full Name</Label>
                <Input
                  id="nameOfStudent"
                  defaultValue={session?.user.name}
                  {...register("nameOfStudent")}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  defaultValue={session?.user.studId}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  defaultValue={session?.user.course}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearAndsection">Year & Section</Label>
                <Input id="yearAndsection" {...register("yearAndsection")} />
                {errors.yearAndsection?.message && (
                  <p className="text-sm text-destructive">
                    {String(errors.yearAndsection.message)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={session?.user.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  defaultValue={session?.user.mobileNumber}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </section>

          {/* Request Details Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                2
              </span>
              Request Details
            </h3>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requestChoices">Document Type</Label>
                <Controller
                  name="requestChoices"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Bulk Request") {
                          setSelectedRequests(["Bulk Request"]);
                        } else {
                          setSelectedRequests([]);
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.requestChoices?.message && (
                  <p className="text-sm text-destructive">
                    {String(errors.requestChoices.message)}
                  </p>
                )}
              </div>
              {isBulkRequest && (
                <div className="space-y-2">
                  <Label>Select documents for bulk request:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {documentTypes
                      .filter((type) => type !== "Bulk Request")
                      .map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`bulk-${type}`}
                            checked={selectedRequests.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRequests([
                                  ...selectedRequests,
                                  type,
                                ]);
                              } else {
                                setSelectedRequests(
                                  selectedRequests.filter((t) => t !== type)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`bulk-${type}`}>{type}</Label>
                        </div>
                      ))}
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="otherDocument">Other (specify)</Label>
                    <Input
                      id="otherDocument"
                      value={otherDocument}
                      onChange={(e) => setOtherDocument(e.target.value)}
                      placeholder="Enter other document type"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="purposeOfrequest">Purpose of Request</Label>
                <Textarea
                  id="purposeOfrequest"
                  placeholder="Please describe the purpose of your request"
                  className="min-h-[100px]"
                  {...register("purposeOfrequest")}
                />
                {errors.purposeOfrequest?.message && (
                  <p className="text-sm text-destructive">
                    {String(errors.purposeOfrequest.message)}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Attachment Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                3
              </span>
              Attachment
            </h3>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="attachment">Request Form (Optional)</Label>
              {attachmentUrl ? (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>File Uploaded</AlertTitle>
                  <AlertDescription className="flex justify-between items-center">
                    <span>Your file has been successfully uploaded.</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAttachmentUrl("")}
                    >
                      Remove
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="border-2 border-dashed rounded-md p-4">
                  <UploadButton
                    endpoint="PdfDocsOrImageUploader"
                    onClientUploadComplete={(res: any) => {
                      if (res && res.length > 0 && res[0].url) {
                        setAttachmentUrl(res[0].url);
                        toast.success("File uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  <div className="flex flex-col items-center mt-2">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC, or image files (max 10MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt Image (Optional)</Label>
              {receiptUrl ? (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>File Uploaded</AlertTitle>
                  <AlertDescription className="flex justify-between items-center">
                    <span>Your file has been successfully uploaded.</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setReceiptUrl("")}
                    >
                      Remove
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="border-2 border-dashed rounded-md p-4">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      if (res && res.length > 0 && res[0].url) {
                        setReceiptUrl(res[0].url);
                        toast.success("File uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  <div className="flex flex-col items-center mt-2">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Image files (max 2MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50">
          <Button variant="outline" asChild>
            <Link href="/student/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
