import { z } from "zod";

export type StudentRequestType = z.infer<typeof StudentRequestSchema>

export const StudentRequestSchema = z.object({
    // nameOfStudent: z.string().min(5, "Full name is required").max(100),
    // studentId: z.string().min(4, "Student ID is required").max(20),
    // course: z.string().min(4, "Course is required").max(40),
    yearAndsection: z.string().min(2, "required").max(40),
    // subjectname: z.string().min(4, "Subject name is required").max(100),
    purposeOfrequest: z.string().min(5, "Purpose is required").max(100),
    requestChoices: z.string().min(2).max(50),
    bulkRequests: z.array(z.string()).optional(),
  });