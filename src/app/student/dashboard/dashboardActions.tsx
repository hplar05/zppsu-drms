import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardActions({}: {
  res: any[];
  requestId: number | null;
}) {
  return (
    <div className="flex justify-center gap-4 my-8">
      <Button variant="default">
        <Link href="/student/add-your-request">Create Request</Link>
      </Button>
    </div>
  );
}
