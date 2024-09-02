import { z } from "zod";

export type AdminCreateRequestType = z.infer<typeof AdminCreateRequestSchema>

export const AdminCreateRequestSchema = z.object({
    nameOfStudent: z.string().min(5, "Full name is required").max(100),
    studentId: z.string().min(4, "Student ID is required").max(20),
    email: z
      .string()
      .email()
      .refine((email) => email.length <= 255, { message: "Email is too long" }),
    mobileNumber: z.string().min(11, "Mobile Number is required"),
    course: z.string().min(4, "Course is required").max(40),
    yearAndsection: z.string().min(4, "Year & Section is required").max(40),
    // subjectname: z.string().min(4, "Subject name is required").max(100),
    purposeOfrequest: z.string().min(5, "Purpose is required").max(100),
    requestChoices: z.string().min(2).max(50),
  });