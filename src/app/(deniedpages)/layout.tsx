import "@/src/app/globals.css";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Denied - ZPPSU DRMS",
  description: "Denied - ZPPSU DRMS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.isApprove === true) {
    revalidatePath("/pending-approval");
    redirect("/student/dashboard");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
