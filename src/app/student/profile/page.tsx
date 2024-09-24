// import { EditProfileDialog } from "@/components/EditProfile";
import Profile from "./Profile";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { notFound } from "next/navigation";
import { EditProfileDialog } from "@/components/EditProfile";

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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Profile />
      <EditProfileDialog user={user} />
    </div>
  );
}
