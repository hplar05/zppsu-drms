import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        username: string,
        firstname: string,
        middlename: string | null,
        lastname: string,
        mobileNumber: string | null,
    }

  interface Session {
    user: User & {
        username: string,
        firstname: string,
        middlename: string | null,
        lastname: string,
        mobileNumber: string | null,
    }
    token: {
        username: string,
        firstname: string,
        middlename: string | null,
        lastname: string,
        mobileNumber: string | null,
    }
  }
}