import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { CreateAnnouncement } from "./CreateAnnoucementForm";
import { AnnouncementList } from "./AnnouncementList";

export default async function AnnouncementsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Announcements</h1>

      {session?.user.role === "ADMIN" && (
        <div className="mb-8">
          <CreateAnnouncement />
        </div>
      )}

      <div>
        <AnnouncementList />
      </div>
    </div>
  );
}
