import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        username: string,
        name: string,
        mobileNumber: string
        role: Role
    }

  interface Session {
    user: User & {
      id: string,
      username: string,
      name: string,
      mobileNumber: string 
      role: Role
    }
    token: {
      id: string,
      username: string,
      firstname: string,
      mobileNumber: string
      role: Role
    }
  }
}