import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import UserNavbar from "./_components/userNavbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import Provider from "@/src/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { Knock } from "@knocklabs/node";
import UserSidebar from "./_components/userSidebar";
import UserFooter from "./_components/userFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student - ZPPSU DRMS",
  description: "Student - ZPPSU DRMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "ADMIN") redirect("/admin/dashboard");
  if (!session || !session.user) redirect("/login");

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
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <div className="flex flex-row h-auto">
              <UserSidebar />
              <main className="flex-1 h-screen pt-1">{children}</main>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
