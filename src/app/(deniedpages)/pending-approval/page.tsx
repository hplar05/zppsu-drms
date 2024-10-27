import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Account Pending Approval</CardTitle>
          </div>
          <CardDescription>
            Your account is currently under review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 rounded-md border p-4">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Thank you for creating an account
              </p>
              <p className="text-sm text-muted-foreground">
                An Registrar admin needs to approve your account before you can
                access the system. You will recieve an email if your account is
                approve or decline.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          {/* <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
