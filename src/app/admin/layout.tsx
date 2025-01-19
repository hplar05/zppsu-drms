import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import { ThemeProvider } from "next-themes";
import UserNavbar from "../student/_components/userNavbar";
import Provider from "@/components/Provider";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/adminNavbar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import Denied from "../(deniedpages)/denied/page";
import { Knock } from "@knocklabs/node";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin - ZPPSU DRMS",
  description: "Admin - ZPPSU DRMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  if (
    session?.user.role === "STUDENT" ||
    (session?.user.role !== "ADMIN" && session?.user.role !== "SUPERADMIN")
  ) {
    redirect("/denied");
  }

  // knock notification
  const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);
  const knockUser = await knockClient.users.identify(session.user.id, {
    name: session.user.name,
    email: session.user.email,
    phone_number: session.user.mobileNumber,
    avatar: session.user.image,
  });
  console.log(knockUser);

  return (
    <html lang="en">
      <body className={inter.className}>
        {session.user.role === "ADMIN" || session.user.role === "SUPERADMIN" ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              <Toaster position="top-right" />
              <div className="hidden max-md:flex mt-2">
                <AdminNavbar />
              </div>
              <div className="md:flex flex-row h-auto ">
                <Sidebar />
                <main className="flex-1 h-screen pt-1">{children}</main>
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
