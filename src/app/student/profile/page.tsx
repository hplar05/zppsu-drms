import { EditProfileDialog } from "@/components/EditProfile";
import Profile from "./Profile";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Profile />
      <EditProfileDialog />
    </div>
  );
}
