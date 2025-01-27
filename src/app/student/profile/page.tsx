// import { EditProfileDialog } from "@/components/EditProfile";
import { Button } from "@/components/ui/button";
import Profile from "./Profile";
import Link from "next/link";
import UserNavbar from "../_components/userNavbar";

export default async function Page() {
  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="p-6 space-y-6">
        <Profile />
        {/* <Button className="bg-[#800000] text-white dark:bg-white dark:text-black">
          <Link href={"/student/profile/update-profile"}>Update Profile</Link>
        </Button> */}
      </div>
    </div>
  );
}
