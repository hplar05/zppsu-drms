import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Minimum password length is 8 characters")
      .max(20, "Maximum password length is 20 characters")
      .refine(
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/.test(password),
        "Password must contain at least one lowercase letter, one uppercase letter, and one special character."
      ),
    name: z.string().min(3, "Name is required"),
    proofOfID: z.string().min(3, "Proof of ID is required"),
    mobileNumber: z.string().length(13, "Mobile number must be exactly 13 characters"),
    studId: z.string().min(5, "Student ID is required").max(15),
    // confirmPassword: z.string().min(1, "Password confirmation is required"),
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
  });
  
  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { username, email, password, name, proofOfID, mobileNumber, studId, course, role } = userSchema.parse(body);
  
      const existingUser = await db.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ message: "Email already exists" }, { status: 409 });
      }
  
      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: { username, email, password: hashedPassword, name, proofOfID, mobileNumber, studId, course, role },
      });
  
      return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
  }
  