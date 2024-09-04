import { Button } from "@/components/ui/button";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserNavbar from "../_components/userNavbar";
import { Tracking } from "./tracking";
import TrackingTable from "./tracking-table";
import { db } from "@/src/lib/db";
import { UploadPaySlipDrawer } from "../_components/uploadPaySlipDrawer";
import { AdminMsgContainer } from "./adminMsgContainer";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const res = await db.requestForm.findMany({
    where: {
      userId: userId,
    },
    select: {
      action: true,
      id: true,
      adminMessage: true,
    },
  });
  // const isActionCompletedOrDeclined = res.some(
  //   (request) => request.action === "COMPLETED" || request.action === "DECLINE"
  // );

  const adminMsg = res.some((request) => request.adminMessage)
    ? res[0].adminMessage
    : null;

  // Get the ID of the request if it exists
  const requestId = res.length === 1 ? res[0].id : null;

  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="p-5 m-6 h-[50vh] rounded-md">
        <div className="flex flex-col justify-center gap-2 w-[40%] pl-10 mb-10">
          <h2 className="text-xl font-bold">Welcome to Dashboard</h2>
        </div>
        <Tracking />
        <div className="flex flex-col gap-20 justify-center items-center my-16">
          {res.length ? (
            <div className="gap-2 flex justify-between">
              <Button className="bg-[#800000] text-white" disabled>
                Create Request
              </Button>
              <UploadPaySlipDrawer requestId={requestId!} />
            </div>
          ) : (
            <Button className="bg-[#800000] text-white dark:bg-white dark:text-black">
              <Link href="/student/add-your-request">Create Request</Link>
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center gap-2 w-full mb-auto">
          <div className="w-[70%] ">
            <TrackingTable userId={userId!} />
          </div>
          <div className="w-[30%]">
            <AdminMsgContainer adminMsg={adminMsg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
