import "@/src/app/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import Link from "next/link";
import Providers from "@/src/providers/Providers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Authentication - ZPPSU DRMS",
  description: "Authentication - ZPPSU DRMS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/student/dashboard");

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
          <Toaster position="top-right" />
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
