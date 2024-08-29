import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
    .min(8, { message: "Minimum password length is 8 characters" })
    .max(20, { message: "Maximum password length is 20 characters" })
    .refine(password => {
        // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
        return passwordPattern.test(password)
    }, { message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character." }),
    name: z.string().min(3, "name is required"),
    image: z.string(),
    mobileNumber: z.string().min(13, "mobile number is required").max(13),
    studId: z.string().min(5, "student id is required").max(15),
    course: z.string().min(4, "course is required").max(100),
  })
 

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, username, name, image, password, mobileNumber, course, studId} = userSchema.parse(body);

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
                image,
                name,
                mobileNumber,
                studId,
                course
            }
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201})
    } catch(error) {

        //if there's a something wrong ex(no internet)
        return NextResponse.json({ message: "Something went wrong"}, {status: 500})
    }
}