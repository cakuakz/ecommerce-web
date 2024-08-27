import { db } from '@vercel/postgres';
import { compare } from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

import { useGetUserProperty } from '@/modules/state/general';

const getUser = async (username: string) => {
  const client = await db.connect()
  try {
    const user = await client.sql`SELECT * FROM users WHERE username = ${username}`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user');
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ username: z.string().min(1), password: z.string().min(1) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { username, password } = parsedCredentials.data;

        try {
          const user = await getUser(username);
          if (!user) {
            return null;
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            return null;
          }

          return { id: user.id, name: user.username };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;       
        token.name = user.name;   
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (!session.user) {
        session.user = {};  
      }
  
      session.user.id = token.id as string;  
      session.user.name = token.name as string;  
  
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}