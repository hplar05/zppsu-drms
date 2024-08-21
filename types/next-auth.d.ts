import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        email: string,
        username: string,
        name: string,
        mobileNumber: string
        role: Role
    }

  interface Session {
    user: User & {
      id: string,
      email: string,
      username: string,
      name: string,
      mobileNumber: string
      role: Role
    }
    token: {
      id: string,
      email: string,
      username: string,
      name: string,
      mobileNumber: string
      role: Role
    }
  }
}