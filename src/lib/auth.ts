import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({    
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email ||  !credentials?.password) {
              return null;
            } 

            const existingUser = await db.user.findUnique({
                where: {email: credentials?.email}
            });
            if(!existingUser) {
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)

            if(!passwordMatch) {
                return null;
            }

            return {
                id: `${existingUser.id}`,
                username: existingUser.username,
                email: existingUser.email,
                name: existingUser.name,
                mobileNumber: existingUser.mobileNumber,
                image: existingUser.image,
                role: existingUser.role,
                studId: existingUser.studId,
                course: existingUser.course,
                isApprove: existingUser.isApprove
            }
          }
        })
      ],

      callbacks: {
        async jwt({ token, user}) {
            if(user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    mobileNumber: user.mobileNumber,
                    image: user.image,
                    role: user.role,
                    studId: user.studId,
                    course: user.course,
                    isApprove: user.isApprove
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    username: token.username,
                    name: token.name,
                    mobileNumber: token.mobileNumber,
                    image: token.image,
                    role: token.role,
                    studId: token.studId,
                    course: token.course,
                    isApprove: token.isApprove
                }
            }
            return session
        }
      }

}