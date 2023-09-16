import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret:"123",
  providers: [
    CredentialsProvider({
      type:"credentials",
      name: "SignIn",
      credentials: {
        email: {
          label: "Email",
          type: "email", 
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { 
        // console.log(credentials);
        const {email, password} = credentials as {
          email: string,
          password: string,
        };
        const user = { id : "1", name : "admin", email: email };
        return user;
      },
    }),
  ],

  callbacks: {
    jwt({token, account, profile, user}) {
      if(account?.provider==="SignIn") {
        token.email=user.email;
      }
      // console.log(token);
      return token;
    }, 
    async session ({session, token}:any)  {
      if("email" in token) {
        session.user.email = token.email;
      } 
      // console.log(session);
      return session;
    }
  }
};
