import { db } from "@/src/lib/db";
import { notFound } from "next/dist/client/components/not-found";
import SetStatusForm from "../../../_components/setStatusForm";

export default async function Page({ params }: { params: { id: string } }) {
  const request = await db.requestForm.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!request) {
    notFound();
  }

  return (
    <div>
      <SetStatusForm
        initialAction={request.action}
        requestId={request.id}
        requestName={request.nameOfStudent}
        requestStudId={request.studentId}
      />
    </div>
  );
}
