import { z } from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    proofOfID: z.string().url("Proof of ID must be a valid URL"),
    mobileNumber: z.string().regex(/^(\+63)?\d{10}$/, "Invalid mobile number"),
    studId: z.string().nonempty("Student ID is required"),
    course: z.enum([
      "BSIT",
      "BSAT",
      "BSET",
      "BSEIexT",
      "BSMT",
      "BSCRACT",
      "BSCompTech",
      "BSEntrep",
      "BSHM",
      "BSInfoTech",
      "BSMarE",
      "BSDevcom",
      "BFA",
    ]),
    role: z.enum([
      "STUDENT",
      "GRADUATE_STUDENT",
      "IRREGULAR",
      "DROPOUT",
      "RETURNEES",
      "ADMIN",
      "SUPERADMIN",
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });