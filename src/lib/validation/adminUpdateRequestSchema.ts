import { z } from "zod"

export type AdminUpdateRequestType = z.infer<typeof AdminUpdateRequestSchema>

export const AdminUpdateRequestSchema = z.object({
    nameOfStudent: z.string().min(5, "name is required").max(40),
    studentId: z.string().min(4, "student ID is required").max(40),
    email: z.string().min(11, "mobile number is required").max(100),
    mobileNumber: z.string().min(11, "mobile number is required").max(11),
    course: z.string().min(4, "course is required").max(11),
    yearAndsection: z.string().min(2, "year and section is required").max(40),
    purposeOfrequest: z.string().min(6, "purpose of request is required").max(200),
})
