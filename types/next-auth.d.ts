import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        username: string,
        firstname: string,
        middlename: string | null,
        lastname: string,
        mobileNumber: string | null,
        role: Role
    }

  interface Session {
    user: User & {
      id: string,
      username: string,
      firstname: string,
      middlename: string | null,
      lastname: string,
      mobileNumber: string | null,
      role: Role
    }
    token: {
      id: string,
      username: string,
      firstname: string,
      middlename: string | null,
      lastname: string,
      mobileNumber: string | null,
      role: Role
    }
  }
}