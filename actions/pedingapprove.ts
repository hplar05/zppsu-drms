"use server"

import { db } from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Knock } from "@knocklabs/node";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);


// Function to approve a user
export async function approveUser(userId: string) {

    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { isApprove: true },
    });
    console.log("User approved successfully:", updatedUser);
  } catch (error) {
    console.error("Error approving user:", error);
  }

  await knockClient.notify("pending-approve-user", {
    actor: session.user.id,
    recipients: [userId],
    data: {
        pending: {
            status: "Congrats your account has been approve.",
            admin: session.user.name
        },
    },
});


  revalidatePath("/admin/pending-approval-users")
  redirect("/admin/pending-approval-users");
}

// Function to decline a user (delete their data)
export async function declineUser(userId: string) {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };
  try {
    await db.user.delete({
      where: { id: userId },
    });
    console.log("User declined and deleted successfully");
  } catch (error) {
    console.error("Error declining user:", error);
  }
  await knockClient.notify("pending-approve-user", {
    actor: session.user.id,
    recipients: [userId],
    data: {
        pending: {
            status: "We regret to inform you that your account has been decline, Kindly check if your proof of ID's are clear or the details you provided is true, Kindly register again to validate your account.",
            admin: session.user.name
        },
    },
});
  revalidatePath("/admin/pending-approval-users")
  redirect("/admin/pending-approval-users");
}
