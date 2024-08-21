"use server"

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
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
    subjectname: z.string().min(4, "subject names is required").max(100),
    purposeOfrequest: z.string().min(6, "purpose of request is required").max(200),
})

export async function createRequest(formData: FormData) {
    const nameOfStudent = formData.get('nameOfStudent') as string;
    const studentId = formData.get('studentId') as string;
    // const mobileNumber = formData.get('mobileNumber') as string;
    const course = formData.get('course') as string;
    const yearAndsection = formData.get('yearAndsection') as string;
    const subjectname = formData.get('subjectname') as string;
    const purposeOfrequest = formData.get('purposeOfrequest') as string;


    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" }

    const studId = session.user.id

    const mobilenumber = session.user.mobileNumber

   const email = session.user.email

    // Convert the string ID to a number if userId expects a numbe
  
    console.log(`${nameOfStudent}, ${course}, ${subjectname}, ${studId}`);

    await db.requestForm.create({
       data: {
        nameOfStudent,
        studentId,
        email: email,
        mobileNumber: mobilenumber,
        course,
        yearAndsection,
        subjectname,
        purposeOfrequest,
        userId: studId,
       }
    });

    revalidatePath("/admin/request-table")
    redirect("/admin/request-table");
}

export const updateRequest = async (
    id: number,
    prevSate: any,
    formData: FormData
) => {
    const validatedFields = RequestSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

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

export const deleteRequest = async (id: number) => {
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
