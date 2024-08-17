import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    firstname: z.string().min(1, "First name is required"),
    middlename: z.string().optional(),
    lastname: z.string().min(1, "Last name is required"),
    mobileNumber: z.string().optional(),
  })
 

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, username, password, firstname, middlename, lastname, mobileNumber} = userSchema.parse(body);

        // check if email already exist
        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: "This email is already exists!"}, {status: 409})
        }

        //check if username already exist
        const existingUserByUsername = await db.user.findUnique({
            where: {username: username}
        });
        if(existingUserByUsername) {
            return NextResponse.json({ user: null, message: "This username is already exists!"}, {status: 409})
        }

        //make the password hash for protection
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstname,
                middlename,
                lastname,
                mobileNumber
            }
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201})
    } catch(error) {

        //if there's a something wrong ex(no internet)
        return NextResponse.json({ message: "Something went wrong"}, {status: 500})
    }
}