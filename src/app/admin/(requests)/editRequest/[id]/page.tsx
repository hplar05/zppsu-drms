import EditRequestForm from "@/src/app/admin/_components/AdminEditRequestForm";
import { db } from "@/src/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  const request = await db.requestForm.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!request) {
    notFound();
  }

  return (
    <main>
      <EditRequestForm request={request} />
    </main>
  );
}
