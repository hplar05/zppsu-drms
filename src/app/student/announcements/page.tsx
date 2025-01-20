import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { AnnouncementList } from "../../admin/announcements/AnnouncementList";
import UserNavbar from "../_components/userNavbar";

export default async function AnnouncementsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Announcements</h1>

        <div>
          <AnnouncementList />
        </div>
      </div>
    </div>
  );
}
