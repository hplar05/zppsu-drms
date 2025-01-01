"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Clock, Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function PendingApproval() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const SignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(`Something went wrong! ${error}`);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#800000] to-[#600000] text-white">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <CardTitle>Account Pending Approval</CardTitle>
            </div>
            <CardDescription className="text-gray-200">
              Your account is currently under review
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Application Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <motion.div
              className="flex items-start gap-4 rounded-md border p-4 bg-amber-50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Thank you for creating an account
                </p>
                <p className="text-sm text-muted-foreground">
                  A Registrar admin needs to approve your account before you can
                  access the system. You will receive an email if your account
                  is approved or declined.
                </p>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50">
            <Button variant="outline" asChild className="w-[48%]">
              <Link href="/" className="flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button onClick={SignOut} variant="destructive" className="w-[48%]">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
