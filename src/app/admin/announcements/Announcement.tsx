import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AnnouncementProps = {
  announcement: {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    user: {
      name: string;
    };
  };
};

export function Announcement({ announcement }: AnnouncementProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={`https://avatar.vercel.sh/${announcement.user.name}`}
          />
          <AvatarFallback>{announcement.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{announcement.title}</CardTitle>
          <CardDescription>
            Posted by {announcement.user.name} on{" "}
            {announcement.createdAt.toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{announcement.body}</p>
      </CardContent>
    </Card>
  );
}
