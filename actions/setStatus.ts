"use server";

import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { Knock } from "@knocklabs/node";
import { db } from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { Twilio } from "twilio";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

//@ts-ignore
export async function updateAction({ id, action, adminMessage }) {
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = new Twilio(accountSid, authToken);

    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    try {
        await db.requestForm.update({
            where: { id },
            data: {
                action,
                adminMessage,
            },
        });
    } catch (error) {
        console.error("Failed to update action:", error);
        throw new Error("Failed to update action");
    }

    const getStudentId = await db.requestForm.findUnique({
        where: { id },
        select: { userId: true },
    });

    if (!getStudentId) {
        throw new Error("UserID not found");
    }

    const userId = getStudentId.userId;

    const requestStudent = await db.user.findUnique({
        where: { id: userId },
    });

    if (!requestStudent) {
        throw new Error("Student not found");
    }

    // // Sending SMS message using Twilio with dummy data
    // try {
    //     await client.messages.create({
    //         body: "Message ka Mikss if ma recieved mo to", 
    //         from: process.env.TWILIO_PHONE_NUMBER, 
    //         to: "+6309694654975", // Dummy recipient's phone number 
    //     });
    // } catch (error) {
    //     console.error("Failed to send SMS:", error);
    //     throw new Error("Failed to send SMS");
    // }

    await knockClient.notify("admin-set-status-request", {
        actor: session.user.id,
        recipients: [requestStudent.id],
        data: {
            request: {
                adminMessage: adminMessage,
                adminName: session.user.name,
                status: action,
                studId: requestStudent.studId,
            },
        },
    });

    revalidatePath("/admin/request-table");
    redirect("/admin/request-table");
}
