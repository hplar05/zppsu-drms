import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import UserNavbar from "../_components/userNavbar";
import { Tracking } from "./tracking";
import { AdminMsgContainer } from "./adminMsgContainer";
import DashboardHeader from "./dashboardHeader";
import DashboardActions from "./dashboardActions";
import UserRequestLists from "../_components/UserRequestTable";
import UserRequestTable from "./UserRequestTable";

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

  const adminMsg = res.some((request) => request.adminMessage)
    ? res[0].adminMessage
    : null;

  const requestId = res.length === 1 ? res[0].id : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserNavbar />
      <main className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tracking />
            <DashboardActions res={res} requestId={requestId} />
            <UserRequestTable />
          </div>
          <div>
            <AdminMsgContainer adminMsg={adminMsg} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
