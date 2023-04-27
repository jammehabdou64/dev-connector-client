import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentails) {
        try {
          const { email, password } = credentails;
          // console.log({ email, password });
          const res = await fetch("http://localhost:8050/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();

          if (data.success) {
            const { message } = data;
            return message;
          }
          throw new Error("Invalid credentials");
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
