import "@/src/app/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import Link from "next/link";
import Providers from "@/src/providers/Providers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ZZPSU AUTH",
  description: "ZZPSU AUTH",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/alreadyLoggedIn");

  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <Providers>
          {children}
          <Toaster />
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
