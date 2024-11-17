"use client";

import { approveUser } from "@/actions/pedingapprove";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string;
}

export function ApproveDialog({ userId }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="success">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#18191A]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to approve?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The account will be permanently
            approved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => approveUser(userId)}>
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
