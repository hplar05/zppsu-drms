"use server"

import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const RequestSchema = z.object({
    nameOfStudent: z.string().min(5, "name is required").max(40),
    studentId: z.string().min(4, "student ID is required").max(40),
    email: z.string().min(11, "mobile number is required").max(100),
    mobileNumber: z.string().min(11, "mobile number is required").max(11),
    course: z.string().min(4, "course is required").max(11),
    yearAndsection: z.string().min(4, "year and section is required").max(20),
    purposeOfrequest: z.string().min(6, "purpose of request is required").max(200),
})


//create admin request
export async function createRequest(formData: FormData) {
 
    try {
        const nameOfStudent = formData.get('nameOfStudent') as string;
        const studentId = formData.get('studentId') as string;
        const email = formData.get('email') as string;
        const mobileNumber = formData.get('mobileNumber') as string;
        const course = formData.get('course') as string;
        const yearAndsection = formData.get('yearAndsection') as string;
        const attachment = formData.get('attachment') as string;
        const purposeOfrequest = formData.get('purposeOfrequest') as string;
    
        const session = await getServerSession(authOptions);
    
        if (!session) return { error: "Unauthorized" }
        
        const adminId = session.user.id
    
        await db.requestForm.create({
           data: {
            nameOfStudent,
            studentId,
            email,
            mobileNumber,
            course,
            yearAndsection,
            attachment: attachment,
            purposeOfrequest,
            userId: adminId,
           }
        });
    } catch (error) {

        return console.log(`Failed to create Document Request : ${error}`)

    }

    revalidatePath("/admin/request-table")
    redirect("/admin/request-table");
}


//update admin request

export const updateRequest = async (
    id: number,
    prevSate: any,
    formData: FormData
) => {
    const validatedFields = RequestSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" }

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        await db.requestForm.update({
            data: {
                nameOfStudent: validatedFields.data.nameOfStudent,
                studentId: validatedFields.data.studentId,
                email: validatedFields.data.email,
                mobileNumber: validatedFields.data.mobileNumber,
                course: validatedFields.data.course,
                yearAndsection: validatedFields.data.yearAndsection,
                purposeOfrequest: validatedFields.data.purposeOfrequest
            },
            where: { id },
        })
    } catch (error) {
        return { message: "Failed to update" }
    }
    revalidatePath("/admin/request-table");
    redirect("/admin/request-table");
}


//delete admin request


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
