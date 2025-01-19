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
    name: z.string().nonempty("Full Name is required"),
    firstName: z.string().nonempty("First Name is required"),
    middleName: z.string().nonempty("Middle Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    proofOfID: z.string().min(3, "Proof of ID is required"),
    mobileNumber: z.string().length(13, "Mobile number must be exactly 13 characters"),
    studId: z.string().min(5, "Student ID is required").max(15),
      yearGraduated: z.string().optional(),
        otherCourse: z.string().optional(),
    // confirmPassword: z.string().min(1, "Password confirmation is required"),
    course: z.enum([
      "OTHERS",
      "COLLEGE OF TEACHER EDUCATION",
      "BACHELOR OF ELEMENTARY EDUCATION",
      "BACHELOR OF SECONDARY EDUCATION - MAJOR IN MATHEMATICS",
      "BACHELOR OF SECONDARY EDUCATION - MAJOR IN ENGLISH",
      "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN HOME ECONOMICS",
      "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN INDUSTRIAL ARTS",
      "BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION - MAJOR IN INFORMATION COMMUNICATION TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN AUTOMOTIVE TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN CIVIL TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR DRAFTING TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN ELECTRICAL TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN ELECTRONICS TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN FOOD SERVICES MANAGEMENT",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN GARMENTS, FASHION, AND DESIGN",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN MECHANICAL TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN WELDING AND FABRICATION TECHNOLOGY",
      "BACHELOR OF TECHNICAL – VOCATIONAL TEACHER EDUCATION - MAJOR IN HEATING, VENTILATION, AND AIR-CONDITIONING TECHNOLOGY",
      "DEPARTMENT OF PHYSICAL EDUCATION",
      "BACHELOR OF PHYSICAL EDUCATION",
      "BACHELOR OF SCIENCE IN EXERCISE AND SPORTS SCIENCES - MAJOR IN FITNESS AND SPORTS COACHING",
      "BACHELOR OF SCIENCE IN EXERCISE AND SPORTS SCIENCES - MAJOR IN FITNESS AND SPORTS MANAGEMENT",
      "COLLEGE OF MARITIME EDUCATION",
      "BACHELOR OF SCIENCE IN MARINE ENGINEERING",
      "COLLEGE OF ENGINEERING AND TECHNOLOGY",
      "BACHELOR OF SCIENCE IN CIVIL ENGINEERING",
      "BACHELOR OF SCIENCE IN AUTOMOTIVE TECHNOLOGY",
      "BACHELOR OF SCIENCE IN ELECTRICAL TECHNOLOGY",
      "BACHELOR OF SCIENCE IN MECHANICAL TECHNOLOGY",
      "BACHELOR OF SCIENCE IN ELECTRONICS TECHNOLOGY",
      "BACHELOR OF SCIENCE IN COMPUTER TECHNOLOGY",
      "BACHELOR OF SCIENCE IN REFRIGERATION AND AIR-CONDITIONING TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN CIVIL TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN ARCHITECTURAL DRAFTING TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN FOOD TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN GARMENTS A TEXTILE TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN POWER PLANT ENGINEERING TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY - MAJOR IN MECHATRONICS TECHNOLOGY",
      "COLLEGE OF INFORMATION COMPUTING SCIENCES",
      "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
      "BACHELOR OF SCIENCE IN INFORMATION SYSTEMS",
      "COLLEGE OF ARTS HUMANITIES AND SOCIAL SCIENCES",
      "BACHELOR OF SCIENCE IN DEVELOPMENT COMMUNICATION",
      "BATSILYER NG SINING SA FILIPINO",
      "BACHELOR OF SCIENCE IN FINE ARTS - MAJOR IN INDUSTRIAL ARTS",
      "SCHOOL OF BUSINESS ADMINISTRATION",
      "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP",
      "BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT",
      "DIPLOMA OF TECHNOLOGY - AUTOMOTIVE ENGINEERING TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - CIVIL ENGINEERING TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - ELECTRICAL ENGINEERING TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - ELECTRONICS AND COMMUNICATION TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - FOOD SERVICES AND MANAGEMENT TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - GARMENTS, FASHION AND DESIGN TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - HOSPITALITY MANAGEMENT TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - INFORMATION TECHNOLOGY",
      "DIPLOMA OF TECHNOLOGY - MECHANICAL ENGINEERING TECHNOLOGY",
      ]),
    role: z.enum([
      "STUDENT",
      "GRADUATE_STUDENT",
      "IRREGULAR",
      "DROPOUT",
      "RETURNEES",
      "SHIFTER",
      "ALUMNI"
    //   "ADMIN",
    //   "SUPERADMIN",
    ]),
  });
  
  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { username, firstName, lastName, middleName, email, password, name, proofOfID, mobileNumber, studId, course, role, otherCourse, yearGraduated} = userSchema.parse(body);
  
      const existingUser = await db.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ message: "Email already exists" }, { status: 409 });
      }

      const existingUsername = await db.user.findUnique({
        where: { username },
      });
  
      if (existingUsername) {
        return NextResponse.json({ message: "Username already exists" }, { status: 409 });
      }

    //   const existingNumber = await db.user.findUnique({
    //     where: { mobileNumber },
    //   });
  
    //   if (existingNumber) {
    //     return NextResponse.json({ message: "Username already exists" }, { status: 409 });
    //   }
  
  
      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: { username, firstName, middleName, lastName, otherCourse, yearGraduated, email, password: hashedPassword, name, proofOfID, mobileNumber, studId, course, role, image:"https://547evqsnjf.ufs.sh/f/i8IdTpLgbnZCXwlo6WiSyIJmDK7xzCieFjOcrbt5vkQ3W2pg" },
      });
  
      return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
  }
  