import UserAvatar from "@/src/components/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
// import User from "@/src/components/User";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserNavbar from "../_components/userNavbar";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="flex flex-col justify-center gap-2 w-[15%] pl-10">
        <h2 className="text-xl font-bold">Hello👋 {session?.user.name}</h2>
        {/* <Badge className="flex justify-center items-center">
          {session?.user.role === "ADMIN" ? "ZPPSU ADMIN" : "ZPPSU STUDENT"}
        </Badge> */}
      </div>
      <div className="flex flex-col gap-20 justify-center items-center">
        <h1>on progress content</h1>
        <Button>
          <Link href="/student/add-your-request">Create Request</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
