"use client";

import React from "react";
import { UploadPaySlipDrawer } from "../../_components/uploadPaySlipDrawer";
import { AlertTriangle } from "lucide-react";

const UploadPaySlip = ({ params }: { params: { id: number } }) => {
  const requestId = params.id; // Extract the requestId from params

  return (
    <div className="max-w-2xl mx-auto bg-background max-md:p-6">
      <h1 className="text-3xl font-bold mb-6">Receipt Upload</h1>

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
        role="alert"
      >
        <div className="flex">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <p>
            <strong className="font-bold">Important Reminder:</strong> As
            advised by the admin, please upload your Receipt image. This is an
            important step in our process.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <UploadPaySlipDrawer requestId={requestId} />
      </div>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Upload Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Prepare your Receipt image for upload.</li>
          <li>Ensure the image is clear and legible.</li>
          <li>The file size must not exceed 2MB.</li>
          <li>Acceptable file formats: JPG, and PNG.</li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Image Requirements</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Clarity:</strong> The image must be clear and all text
            should be easily readable.
          </li>
          <li>
            <strong>Completeness:</strong> Ensure the entire Receipt is visible
            in the image.
          </li>
          <li>
            <strong>File Size:</strong> Maximum 2MB. Please compress your image
            if it exceeds this limit.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Important Notes</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Blurry or incomplete images will not be accepted.</li>
          <li>Uploads exceeding 2MB will be automatically rejected.</li>
          <li>
            If you encounter any issues during the upload process, please
            contact the HR department.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Next Steps</h2>
        <p>After successfully uploading your Receipt:</p>
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
      </section>
      {/* <p className="mt-6 text-center font-semibold">
        Thank you for your cooperation in this important matter.
      </p> */}
    </div>
  );
};

export default UploadPaySlip;
