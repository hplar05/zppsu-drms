import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import UserNavbar from "../user/dashboard/_components/userNavbar";
import Provider from "@/components/Provider";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/adminNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZZPSU Document Request",
  description: "ZZPSU Document Request",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Toaster />
            <div className="flex flex-col min-h-screen w-full">
              <AdminNavbar />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 max-md:flex-0 max-md:p-0 p-5">
                  {children}
                </main>
              </div>
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
