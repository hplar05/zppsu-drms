import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
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
                firstname: existingUser.firstname,
                middlename: existingUser.middlename,
                lastname: existingUser.lastname,
                mobileNumber: existingUser.mobileNumber,
                role: existingUser.role
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
                    username: user.username,
                    firstname: user.firstname,
                    middlename: user.middlename,
                    lastname: user.lastname,
                    mobileNumber: user.mobileNumber,
                    role: user.role
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
                    username: token.username,
                    firstname: token.firstname,
                    middlename: token.middlename,
                    lastname: token.lastname,
                    mobileNumber: token.mobileNumber,
                    role: token.role
                }
            }
            return session
        }
      }

}