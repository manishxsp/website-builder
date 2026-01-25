import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For development: Simple check. In production, use bcrypt to hash/compare.
        if (credentials?.email === "admin@builder.com" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@builder.com" };
        }
        return null;
      }
    })
  ]
};
