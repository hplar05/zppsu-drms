"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateAction } from "@/actions/setStatus";

const formSchema = z.object({
  action: z.enum([
    "PENDING",
    "DECLINE",
    "APPROVE_PENDING_PAYMENT",
    "PAID",
    "COMPLETED",
  ]),
  adminMessage: z.string().min(1, "Admin message is required"),
});

interface SetStatusFormProps {
  initialAction: string;
  requestId: number;
  requestName: string;
  requestStudId: string;
}

export function SetStatusForm({
  initialAction,
  requestId,
  requestName,
  requestStudId,
}: SetStatusFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: initialAction as z.infer<typeof formSchema>["action"],
      adminMessage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await updateAction({
        id: requestId,
        action: values.action,
        adminMessage: values.adminMessage,
      });
      toast.success(`Successfully set status to ${values.action}`);
      router.push("/admin/request-table");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Update Request Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">
                {requestName} ({requestStudId})
              </h3>
            </div>
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Action</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="DECLINE">Decline</SelectItem>
                      <SelectItem value="APPROVE_PENDING_PAYMENT">
                        Approve Pending For Payment
                      </SelectItem>
                      <SelectItem value="PAID">For Approval</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter admin message"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
