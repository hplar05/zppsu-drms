import { z } from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z
  .object({
    name: z.string().nonempty("Full Name is required"),
    // firstName: z.string().nonempty("First Name is required"),
    // middleName: z.string().nonempty("Middle Name is required"),
    // lastName: z.string().nonempty("Last Name is required"),
    // username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    proofOfID: z.string().url("Proof of ID must be a valid URL"),
    mobileNumber: z.string().regex(/^(\+63)?\d{10}$/, "Invalid mobile number"),
    studId: z.string().nonempty("Student ID is required"),
    yearGraduated: z.string().optional(),
    otherCourse: z.string().optional(),
    extention: z.string().optional(),
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
      // "ADMIN",
      // "SUPERADMIN",
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });