import { getAnnouncements } from "@/actions/announcement";
import { Announcement } from "./Announcement";

export async function AnnouncementList() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <Announcement key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
