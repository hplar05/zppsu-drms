import { Role } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string,
        email: string,
        // username: string,
        name: string,
        mobileNumber: string,
        image: string | null,
        course: string,
        studId: string,
        role: Role,
        isApprove: boolean
    }

    interface Session {
        user: User & {
            id: string,
            email: string,
            // username: string,
            name: string,
            mobileNumber: string,
            image: string | null,
            course: string,
            studId: string,
            role: Role,
            isApprove: boolean
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        email: string,
        // username: string,
        name: string,
        mobileNumber: string,
        image: string | null,
        course: string,
        studId: string,
        role: Role,
        isApprove: boolean
    }
}
