import { db } from "@/lib/db";
import { notFound } from "next/navigation";

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
    <main>
      <h1>{request.nameOfStudent}</h1>
      <p>{request.course}</p>
    </main>
  );
}
