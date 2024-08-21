import EditRequestForm from "@/app/admin/_components/editRequestForm";
import { db } from "@/lib/db";
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
