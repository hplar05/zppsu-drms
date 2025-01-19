"use server";

import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { Knock } from "@knocklabs/node";
import { db } from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

const updateActionSchema = z.object({
  id: z.number(),
  action: z.enum(["PENDING", "DECLINE", "APPROVE_PENDING_PAYMENT", "PAID", "COMPLETED"]),
  adminMessage: z.string().min(1),
});

export async function updateAction(input: z.infer<typeof updateActionSchema>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { id, action, adminMessage } = updateActionSchema.parse(input);

  try {
    await db.requestForm.update({
      where: { id },
      data: {
        action,
        adminMessage,
      },
    });

    const requestForm = await db.requestForm.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!requestForm || !requestForm.user) {
      throw new Error("Request or user not found");
    }

    await knockClient.notify("admin-set-status-request", {
      actor: session.user.id,
      recipients: [requestForm.user.id],
      data: {
        request: {
          adminMessage: adminMessage,
          adminName: session.user.name,
          status: action,
          studId: requestForm.user.studId,
        },
      },
    });

    revalidatePath("/admin/request-table");
  } catch (error) {
    console.error("Failed to update action:", error);
    throw new Error("Failed to update action");
  }
}

