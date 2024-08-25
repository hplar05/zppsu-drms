import { Button } from "@/src/components/ui/button";
import User from "@/src/components/User";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h2>welcome to userpage {session?.user?.name}</h2>
      <h2>{/* <User /> */}</h2>
      <div className="h-screen flex justify-center items-center">
        <Button>
          <Link href="/student/add-your-request">Create Request</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
