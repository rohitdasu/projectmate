import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import * as dotenv from 'dotenv';
dotenv.config();

export const ProductionAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  events: {
    async createUser(message) {
      const userId = message.user.id;

      try {
        await prisma.user.update({
          where: { id: userId },
          data: {
            username: message.user.id,
          },
        });
      } catch (error) {
        console.error('Error updating username:', error);
      }

      return Promise.resolve();
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};

export const DevAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize() {
        const user = await prisma.user.findFirst({
          where: { email: 'johndio@test.com' },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(
  process.env.NODE_ENV === 'development' || process.env.APP_STAGING === 'true'
    ? DevAuthOptions
    : ProductionAuthOptions
);
