"use server"

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function createRequest(formData: FormData) {
    const nameOfStudent = formData.get('nameOfStudent') as string;
    const studentId = formData.get('studentId') as string;
    const mobileNumber = formData.get('mobileNumber') as string;
    const course = formData.get('course') as string;
    const yearAndsection = formData.get('yearAndsection') as string;
    const subjectname = formData.get('subjectname') as string;
    const purposeOfrequest = formData.get('purposeOfrequest') as string;


    const session = await getServerSession(authOptions);

    if (!session) return { error: "Unauthorized" }

    const studId = session.user.id

   

    // Convert the string ID to a number if userId expects a numbe
  
    console.log(`${nameOfStudent}, ${course}, ${subjectname}, ${studId}`);

    await db.requestForm.create({
       data: {
        nameOfStudent,
        studentId,
        mobileNumber,
        course,
        yearAndsection,
        subjectname,
        purposeOfrequest,
        userId: studId,
       }
    });
}

