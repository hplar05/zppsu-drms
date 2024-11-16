import { z } from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, { message: "Minimum password length is 8 characters" })
      .max(20, { message: "Maximum password length is 20 characters" })
      .refine(
        (password) => {
          // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
          const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
          return passwordPattern.test(password);
        },
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, and one special character.",
        }
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    name: z.string().min(3, "name is required"),
    proofOfID: z.string().min(3, "proofs of id is required"),
    mobileNumber: z.string().min(13, "mobile number is required").max(13),
    studId: z.string().min(5, "student id is required").max(15),
    course: z.string().min(4, "course is required").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });