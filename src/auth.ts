import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        const callbcakUrl = new URL(url).searchParams.get("callbackUrl");
        if (callbcakUrl) {
          return callbcakUrl;
        }
        throw new Error("Invalid callback url");
      } catch (e) {
        console.log(e);
        return baseUrl;
      }
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {},
      authorize: async () => {
        return {
          id: "123",
          name: "J Smith",
          email: "jsmith@example.com",
        };
      },
    }),
  ],
});
