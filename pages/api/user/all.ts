import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { errorResponse } from '@/lib/httpResponse';
import { getUsersWithProjects } from '@/lib/user';
import { withRateLimit } from '@/lib/withRateLimit';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { limit, cursorId } = req.query;
      const userLimit: number = Number(limit) || 35;
      try {
        const data = await getAllUsers({
          limit: userLimit,
          cursorId: cursorId ? cursorId.toString() : undefined,
        });
        return res.json(data);
      } catch (error) {
        return errorResponse({
          res,
          message: 'Internal Error',
          statusCode: 500,
          success: false,
        });
      }

    default:
      return errorResponse({
        res,
        message: 'Bad Request',
        statusCode: 400,
        success: false,
      });
  }
}

async function getAllUsers(args: { limit: number; cursorId?: string }) {
  const { limit, cursorId } = args;
  let users: User[];
  try {
    if (cursorId) {
      users = await prisma.user.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: cursorId,
        },
      });
    } else {
      users = await prisma.user.findMany({ take: limit });
    }

    const usersWithProjects = await getUsersWithProjects(users);

    // const sortedUsers = usersWithProjects.sort(
    //   (a, b) => b.numberOfProjects - a.numberOfProjects
    // );

    return usersWithProjects;
  } catch (error) {
    throw error;
  }
}

export default withRateLimit(handler);
