"use client";

import { updateAction } from "@/actions/setStatus";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import Link from "next/link";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface SetStatusFormProps {
  initialAction: string;
  requestId: number;
  requestName: string;
  requestStudId: string;
}

export default function SetStatusForm({
  initialAction,
  requestId,
  requestName,
  requestStudId,
}: SetStatusFormProps) {
  const [action, setAction] = useState(initialAction);
  const [adminMessage, setAdminMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      updateAction({ id: requestId, action, adminMessage });
    });
    toast.success(`Successfully Set to ${action}`);
  };

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 border p-10 rounded-md w-[600px] text-center">
          <h3>
            {requestName} {requestStudId}
          </h3>
          <Label htmlFor="action">Update Action:</Label>
          <select
            id="action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="text-center rounded-md border-black dark:border-white border w-[40%] flex mx-auto"
            required
          >
            <option value="PENDING">PENDING</option>
            <option value="DECLINE">DECLINE</option>
            <option value="APPROVE_PENDING_PAYMENT">
              APPROVE PENDING FOR PAYMENT
            </option>
            <option value="PAID">PAID</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <Label htmlFor="adminMessage">Admin Message:</Label>
          <Textarea
            id="adminMessage"
            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
            placeholder="Enter admin message"
            required
          />

          {/* <Button>
            <Link href="">Cancel</Link>
          </Button> */}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
