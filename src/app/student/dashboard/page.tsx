import { Button } from "@/src/components/ui/button";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserNavbar from "../_components/userNavbar";
import { Tracking } from "./tracking";
import TrackingTable from "./tracking-table";
import { db } from "@/src/lib/db";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const res = await db.requestForm.findMany({
    where: {
      userId: userId,
    },
    select: {
      action: true,
    },
  });
  const isActionCompletedOrDeclined = res.some(
    (request) => request.action === "COMPLETED" || request.action === "DECLINE"
  );

  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="p-5 m-6 h-[50vh] rounded-md">
        <div className="flex flex-col justify-center gap-2 w-[40%] pl-10 mb-10">
          <h2 className="text-xl font-bold">Welcome to Dashboard</h2>
        </div>
        <Tracking />
        <div className="flex flex-col gap-20 justify-center items-center my-20">
          {isActionCompletedOrDeclined ? (
            <Button disabled>Create Request</Button>
          ) : (
            <Button>
              <Link href="/student/add-your-request">Create Request</Link>
            </Button>
          )}
        </div>
        <TrackingTable userId={userId!} />
      </div>
    </div>
  );
};

export default Page;
