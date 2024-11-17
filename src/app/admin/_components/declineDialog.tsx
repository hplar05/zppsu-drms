"use client";

import { declineUser } from "@/actions/pedingapprove";
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

export function DeclineDialog({ userId }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Decline</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#18191A]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to decline?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The account and associated data will
            be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => declineUser(userId)}>
            Decline
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
