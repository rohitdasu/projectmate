import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import * as dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw Error('MISSING GITHUB CLIENT ID OR SECRET KEY');
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw Error('MISSING GOOGLE CLIENT ID OR SECRET KEY');
}

export const ProductionAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
        const user = prisma.user.findFirst({
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
