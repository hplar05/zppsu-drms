"use client";

import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { UploadDropzone } from "@/src/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";

interface UploadPaySlipDrawerProps {
  requestId: number;
}

export function UploadPaySlipDrawer({ requestId }: UploadPaySlipDrawerProps) {
  const [payslipUrl, setPaySlipUrl] = useState("");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="bg-[#800000] text-white">
          Upload Pay Slip
        </Button>
      </DrawerTrigger>
      <DrawerContent>
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
                <div className="flex justify-center items-center">
                  <p>Attachment Uploaded</p>
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
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
