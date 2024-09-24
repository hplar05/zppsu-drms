import { z } from "zod";

export type UserUpdateProfileType = z.infer<typeof UserUpdateProfileSchema>

export const UserUpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  username: z.string().min(1, "Username is required").max(50, "Username is too long"),
});
