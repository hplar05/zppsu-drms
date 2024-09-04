"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UploadDropzone } from "@/src/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import { uploadPayslip } from "@/actions/uploadpayslip";
import Image from "next/image";

interface UploadPaySlipDrawerProps {
  requestId: number;
}

export function UploadPaySlipDrawer({ requestId }: UploadPaySlipDrawerProps) {
  const [payslipUrl, setPaySlipUrl] = useState("");
  const [getrequestId, setRequestId] = useState(requestId);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (payslipUrl) {
      formData.append("payslipUrl", payslipUrl);
    }

    formData.append("requestId", getrequestId.toString());

    await uploadPayslip(formData);
    toast.success("Successfully Uploaded PaySlip");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="bg-[#800000] text-white">
          Upload Pay Slip
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={onSubmit}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Upload Pay Slip</DrawerTitle>
              <DrawerDescription className="text-xs">
                If admin advice you to upload, Upload your pay slip here.
              </DrawerDescription>
            </DrawerHeader>
            <div className=" pb-0">
              <div className="flex items-center justify-center">
                {payslipUrl.length ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p>Payslip Uploaded</p>
                    <Image
                      height={200}
                      width={200}
                      src={payslipUrl}
                      alt="Payslip"
                    />
                    <Button
                      onClick={() => {
                        setPaySlipUrl("");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res: any) => {
                        setPaySlipUrl(res[0]?.url);
                        if (payslipUrl) {
                          toast.success("Image uploaded successfully");
                        }
                        if (res && res.length > 0 && res[0].url) {
                          setPaySlipUrl(res[0].url);
                        } else {
                          console.error(
                            "Please input a valid avatar image.",
                            res
                          );
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  console.log(requestId);
                }}
                className="bg-[#800000] text-white"
              >
                Upload
              </Button>
              <DrawerClose asChild>
                <Button type="submit" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
