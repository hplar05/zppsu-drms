import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminMsgContainer = ({
  adminMsg,
}: {
  adminMsg: string | null;
}) => {
  const noMsg = "No message for now";

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Admin Message</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          {adminMsg?.length ? adminMsg : noMsg}
        </p>
      </CardContent>
    </Card>
  );
};
