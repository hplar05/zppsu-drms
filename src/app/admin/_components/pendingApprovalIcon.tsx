import { UserCog } from "lucide-react";

export default function PendingApprovalICon({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} flex items-center justify-center`}
    >
      <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
      <div className="relative bg-yellow-100 rounded-full p-2">
        <UserCog className="text-yellow-600" />
      </div>
    </div>
  );
}
