"use client";
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
import { signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PendingApproval() {
  const SignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
      toast.error("Something went wrong!");
    }
  };

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
                A Registrar admin needs to approve your account before you can
                access the system. You will receive an email if your account is
                approved or declined.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button onClick={SignOut} variant="destructive">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
