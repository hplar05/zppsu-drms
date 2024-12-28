"use client";

import React from "react";
import { UploadPaySlipDrawer } from "../../_components/uploadPaySlipDrawer";
import {
  AlertTriangle,
  FileImage,
  FileCheck,
  FileWarning,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const UploadPaySlip = ({ params }: { params: { id: number } }) => {
  const requestId = params.id;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">Receipt Upload</h1>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Reminder</AlertTitle>
        <AlertDescription>
          As advised by the admin, please upload your Receipt image. This is an
          important step in our process.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Upload Your Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <UploadPaySlipDrawer requestId={requestId} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileImage className="mr-2 h-5 w-5" />
              Upload Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Prepare your Receipt image for upload.</li>
              <li>Ensure the image is clear and legible.</li>
              <li>The file size must not exceed 2MB.</li>
              <li>Acceptable file formats: JPG and PNG.</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5" />
              Image Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Clarity:</strong> The image must be clear and all text
                should be easily readable.
              </li>
              <li>
                <strong>Completeness:</strong> Ensure the entire Receipt is
                visible in the image.
              </li>
              <li>
                <strong>File Size:</strong> Maximum 2MB. Please compress your
                image if it exceeds this limit.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileWarning className="mr-2 h-5 w-5" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Blurry or incomplete images will not be accepted.</li>
            <li>Uploads exceeding 2MB will be automatically rejected.</li>
            <li>
              If you encounter any issues during the upload process, please
              contact the HR department.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRight className="mr-2 h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">After successfully uploading your Receipt:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Our Admin will review the document.</li>
            <li>
              You will receive a confirmation email once the review is complete.
            </li>
            <li>
              If there are any issues, we will contact you for additional
              information.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Separator />

      <p className="text-center font-semibold text-muted-foreground">
        Thank you for your cooperation in this important matter.
      </p>
    </div>
  );
};

export default UploadPaySlip;
