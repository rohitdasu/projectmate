import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { errorResponse } from '@/lib/httpResponse';
import { getUsersWithProjects } from '@/lib/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { limit, cursorId } = req.query;
      const userLimit: number = Number(limit) || 7;
      try {
        const data = await getPaginatedMates({
          limit: userLimit,
          cursorId: cursorId?.toString() ?? undefined,
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

async function getPaginatedMates(args: { limit: number; cursorId?: string }) {
  const { limit, cursorId } = args;
  try {
    const users: User[] = await prisma.user.findMany({
      take: limit,
      skip: 1,
      cursor: {
        id: cursorId,
      },
    });

    const usersWithProjects = await getUsersWithProjects(users);

    const sortedUsers = usersWithProjects.sort(
      (a, b) => b.numberOfProjects - a.numberOfProjects
    );

    return sortedUsers;
  } catch (error) {
    throw error;
  }
}
