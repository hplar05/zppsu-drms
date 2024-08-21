import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import UserNavbar from "./dashboard/_components/userNavbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZZPSU Document Request",
  description: "ZZPSU Document Request",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "ADMIN") redirect("/admin/dashboard");
  if (!session) redirect("/login");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <UserNavbar />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
