// import { EditProfileDialog } from "@/components/EditProfile";
import { Button } from "@/components/ui/button";
import Profile from "./Profile";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Profile />
      <Button>
        <Link href={"/student/profile/update-profile"}>Update Profile</Link>
      </Button>
    </div>
  );
}
