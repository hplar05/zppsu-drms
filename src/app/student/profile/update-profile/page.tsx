import { EditProfileForm } from "@/src/app/student/_components/EditProfileForm";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <EditProfileForm user={user} />
    </main>
  );
}
