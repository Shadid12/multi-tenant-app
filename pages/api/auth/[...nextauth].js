import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import faunadb from 'faunadb';

var serverClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY,
  domain: process.env.FAUNA_DOMAIN,
})


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log('authorize', credentials, req);
      }
    })
  ],
  callbacks: {
    signIn: async (req, res) => { 
      console.log('signIn', req, res);
    },
    session: ({ session }) => {
      return {
        session
      }
    }
  },
  secret: "my-secret-key",
  pages: {
    signIn: "/signin",
  }
})