import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardActions({
  res,
  requestId,
}: {
  res: any[];
  requestId: number | null;
}) {
  return (
    <div className="flex justify-center gap-4 my-8">
      {res.length ? (
        <>
          <Button variant="secondary" disabled>
            Create Request
          </Button>
          <Button variant="default">
            <Link href={`/student/uploadpayslip/${requestId}`}>
              Upload Receipt
            </Link>
          </Button>
        </>
      ) : (
        <Button variant="default">
          <Link href="/student/add-your-request">Create Request</Link>
        </Button>
      )}
    </div>
  );
}
