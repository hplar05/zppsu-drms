import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import UserNavbar from "../user/dashboard/_components/userNavbar";
import Provider from "@/components/Provider";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/adminNavbar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Denied from "../(deniedpages)/denied/page";

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

  if (!session) {
    redirect("/");
  }
  if (session?.user.role === "STUDENT" || session?.user.role !== "ADMIN") {
    redirect("/denied");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {session.user.role === "ADMIN" ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              <Toaster />

              <div className="flex flex-col min-h-screen w-full">
                {/* <AdminNavbar /> */}
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1 max-md:flex-0 max-md:p-0 p-5">
                    {children}
                  </main>
                </div>
              </div>
            </Provider>
          </ThemeProvider>
        ) : (
          <Denied />
        )}
      </body>
    </html>
  );
}
