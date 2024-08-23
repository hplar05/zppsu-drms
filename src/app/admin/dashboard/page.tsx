import { db } from "@/src/lib/db";
import { user } from "@nextui-org/react";
import { Users } from "lucide-react";
import { Suspense } from "react";

export default async function Dashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = await db.requestForm.count();
  const users = await db.user.count();
  const announcement = await db.announcement.count();

  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback="Loading...">
        <p>Total Requests: {requests}</p>
        <p>Total Users: {users}</p>
        <p>Total Total: {announcement}</p>
      </Suspense>
    </main>
  );
}
