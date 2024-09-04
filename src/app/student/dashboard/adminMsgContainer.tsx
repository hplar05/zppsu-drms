import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdminMsgContainer = ({
  adminMsg,
}: {
  adminMsg: string | null;
}) => {
  const noMsg = "No message for now";

  return (
    <div className="h-auto">
      <Card className="dark:border-white dark:bg-transparent rounded-md border-2 border-[#800000]">
        <CardHeader>
          <CardTitle>Admin Message</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{adminMsg?.length ? adminMsg : noMsg}</p>
        </CardContent>
      </Card>
    </div>
  );
};
