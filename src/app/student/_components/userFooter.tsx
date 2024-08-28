import { View, Text } from "react-native";
import React from "react";
import Link from "next/dist/client/link";

export default function UserFooter() {
  return (
    <footer className=" py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="container max-w-7xl flex flex-col sm:flex-row justify-between">
        <p className="text-xs text-muted-foreground">
          2024 ZPPSU-DRMS Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
