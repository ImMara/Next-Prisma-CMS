import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "../../../lib/prismadb";
import { PrismaClient } from '@prisma/client'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "domain-login",
            name: "Domain Account",
            async authorize(credentials: any, req: any) {
                // find user in prisma with credential email
                const prismaC = new PrismaClient()
                const user = await prismaC.user.findUnique({
                    where: {
                        email:credentials.email
                    }
                })
                prismaC.$disconnect()
               if (!user) {
                     throw new Error("No user found")
               }else{
                   return user
               }
            },
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
})

