import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import OpeniddictIdentityServer from "./openiddict_provider";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret:"123",
  providers: [
    CredentialsProvider({
      id:"SignIn",
      type:"credentials",
      name: "Credentials", 
      credentials: {
        email: {
          label: "Email",
          type: "email", 
        },
        password: { label: "Password", type: "password" }
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
    OpeniddictIdentityServer({
      id: 'openiddict',
      name: 'Openiddict',
      clientId: "NextJsClient",
      clientSecret: "NextJs-Secret",
      issuer: "http://localhost:7211",
      authorization: { params: { scope: 'openid profile' } },
      idToken: true,
    })
  ],

  callbacks: {
    jwt({token, account, profile, user}) {
      if(account?.provider==="SignIn") {
        token.email=user.email;
      }
      if(account?.provider==="NextJsClient") {
        
        // if (account) {
        //   token.access_token = account.access_token;
        // }
      }
      console.log("TOKEN :");
      console.log(token);

      return token;
    }, 
    async session ({session, token}:any)  {
      if("email" in token) {
        session.user.email = token.email;
      } 
      console.log("SESSION :");
       console.log(session);
      return session;
    }
  }
};
