import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   // signIn: "/auth/signin",
  //   signOut: "/",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // console.log(
      //   "--Session CALLED--",
      //   session,
      //   "--user--",
      //   user,
      //   "--token--",
      //   token
      // );
      session.user.role = user.role; //ADD THIS LINE SO THAT ROLE IS INCLUDED AS PART OF SESSION INFO.
      session.user.userId = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
