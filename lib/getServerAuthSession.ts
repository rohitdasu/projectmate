import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import {
  ProductionAuthOptions,
  DevAuthOptions,
} from '@/pages/api/auth/[...nextauth]';

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return await unstable_getServerSession(
    ctx.req,
    ctx.res,
    process.env.NODE_ENV === 'development' || process.env.APP_STAGING === 'true'
      ? DevAuthOptions
      : ProductionAuthOptions
  );
};
