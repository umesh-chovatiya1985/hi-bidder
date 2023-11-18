import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
// import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { getAPIUrl } from "../../../lib/useLocalStorage";

const getUser = async (token: any) => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const res = await fetch(mainApiUrl+"/user/user-by-token", {
      method: 'POST',
      body: JSON.stringify(token),
      headers: { "Content-Type": "application/json" }
    })
    const response = await res.json();
    if (res.ok && response.status == '1') {
      return response.user;
    }
};

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: {
        //     appleId: process.env.APPLE_ID,
        //     teamId: process.env.APPLE_TEAM_ID,
        //     privateKey: process.env.APPLE_PRIVATE_KEY,
        //     keyId: process.env.APPLE_KEY_ID,
        //   },
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {},
          async authorize(credentials, req) {
            const mainApiUrl = getAPIUrl() || process.env.API_URL;
            const res = await fetch(mainApiUrl+"user/authenticate", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            });
            const response = await res.json();
            if (res.ok && response.status == '1') {
              return response.user;
            }
            throw new Error(response.message);
          }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET
    },
    callbacks: {
      async jwt({token, account, profile}) {
        const userInfo = await getUser(token);
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        if(userInfo){
          token.userinfo = userInfo;
          token.user_role = userInfo.user_role;
          token.sub = userInfo._id;
        }
        return token;
      },
      async session({ session, token }) {
        // console.log(token); Sub is an _id
        // console.log(token);
        session.user = {
            id: token.sub,
            ...session.user
        }
        return session;
      },
      // redirect: async ({url, baseUrl}) => {
      //   console.log("Redirect" + url + "  " + baseUrl);
      //   const path = url.split('?')[1];
      //   console.log(path);
      //   if (url === '/profile') {
      //     return Promise.resolve('/');
      //   }
      //   return Promise.resolve('/');
      // },
    },
    pages: {
      signIn: '/login',
      error: '/login'
    }
  });