import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import UserNavbar from "./_components/userNavbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import Provider from "@/components/Provider";

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
