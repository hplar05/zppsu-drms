"use server"

import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {Knock} from '@knocklabs/node'


const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY)

// add student request
export async function createRequest(formData: FormData) {
    const yearAndsection = formData.get('yearAndsection') as string;
    const attachment = formData.get('attachment') as string;
    const payslipUrl  = formData.get('receipt') as string;
    const purposeOfrequest = formData.get('purposeOfrequest') as string;
    const requestChoices =  formData.get('requestChoices') as string;
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" };
    
    const userId = session.user.id;
    const mobileNumber = session.user.mobileNumber;
    
    const email = session.user.email;
    const nameOfStudent = session.user.name;
    const course = session.user.course;
    const studentId = session.user.studId;

    let parsedRequestChoices: string[];
    try {
        parsedRequestChoices = JSON.parse(requestChoices);
    } catch {
        parsedRequestChoices = [requestChoices];
    }

    const isBulkRequest = parsedRequestChoices.length > 1 || parsedRequestChoices[0] === "Bulk Request";

    await db.requestForm.create({
        data: {
            nameOfStudent,
            studentId,
            email,
            mobileNumber,
            course,
            yearAndsection,
            attachment,
            payslipUrl,
            purposeOfrequest,
            requestChoices: parsedRequestChoices.join(', '),
            bulkRequest: isBulkRequest ? 'true' : 'false',
            adminMessage: "Your request application is pending",
            user: {
                connect: {
                    id: userId, 
                },
            },
        },
    });

    const studentRecipient = await db.user.findMany({
        where: {
            role: "ADMIN"
        },
    });
    
    const recipientIds = studentRecipient.map(user => user.id);
    
    await knockClient.notify('student-create-request', {
        actor: session.user.id,
        recipients: recipientIds, 
        data: {
            student: {
                name: session.user.name,
                reason: purposeOfrequest,
                studentId: studentId
            }
        }
    });

    revalidatePath("/admin/request-table");
    redirect("/student/dashboard");
}



    



// edit student request




// delete student request

export const deleteRequest = async (id: number) => {
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" }
    try {
        await db.requestForm.delete({
            where: { id }
        })
    } catch (error) {
        return { message: "Failed to delete request" }
    }

    revalidatePath("/admin/request-table");
    redirect("/admin/request-table");
}
