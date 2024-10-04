"use server"

import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { UserUpdateProfileSchema } from "@/src/lib/validation/userUpdateProfileSchema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const updateprofile = async (
    id: string,
    prevSate: any,
    formData: FormData
) => {
    const validatedFields = UserUpdateProfileSchema.safeParse(
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
        await db.user.update({
            data: {
                name : validatedFields.data.name,
                username: validatedFields.data.username,
            },
            where: {id}
        })
    } catch (error) {
        return { message: "Failed to update" }
    }

    revalidatePath("/student/profile");
    redirect("/student/profile");
}