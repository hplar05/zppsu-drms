import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to Dashboard
      </h1>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Reminder</AlertTitle>
        <AlertDescription>
          Expect 2 to 3 working days before getting your Request Documents after
          submitting your Request Form Document. Thank you for your patience.
        </AlertDescription>
      </Alert>
    </div>
  );
}
