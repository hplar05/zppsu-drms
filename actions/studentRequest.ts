"use server"

import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {Knock} from '@knocklabs/node'


// add student request
const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY)

export async function createRequest(formData: FormData) {
    // const nameOfStudent = formData.get('nameOfStudent') as string;
    const studentId = formData.get('studentId') as string;
    const course = formData.get('course') as string;
    const yearAndsection = formData.get('yearAndsection') as string;
    const subjectname = formData.get('subjectname') as string;
    const attachment = formData.get('attachment') as string;
    const purposeOfrequest = formData.get('purposeOfrequest') as string;

    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" };
    
    const studId = session.user.id;
    const mobileNumber = session.user.mobileNumber;
    const email = session.user.email;
    const name = session.user.name;
    const userRole = session.user.role;

    // console.log(`${nameOfStudent}, ${course}, ${subjectname}, ${studId}, ${email}, ${mobileNumber}`);

    await db.requestForm.create({
        data: {
            nameOfStudent: name,
            studentId,
            email,
            mobileNumber,
            course,
            yearAndsection,
            subjectname,
            attachment,
            purposeOfrequest,
            userId: studId,
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
