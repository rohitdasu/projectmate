import { getServerAuthSession } from '@/lib/getServerAuthSession';
import {
  errorResponse,
  successResponse,
  validationResponse,
} from '@/lib/httpResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import bodyValidator from '@/lib/bodyValidator';
import { userDetailsSchema } from '@/schema/userDetailsSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return errorResponse({
      res,
      message: 'Unauthorized',
      statusCode: 401,
      success: false,
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const data = await getUserDetails(session);
        return successResponse({
          res,
          message: '',
          results: data,
          statusCode: 200,
          success: true,
        });
      } catch (error) {
        return errorResponse({
          res,
          message: 'Internal Error',
          statusCode: 500,
          success: false,
        });
      }
    case 'POST':
      try {
        const validatedBody = await bodyValidator(req, userDetailsSchema);
        const data = await updateUserDetails(validatedBody, session);
        return successResponse({
          res,
          message: '',
          results: data,
          statusCode: 201,
          success: true,
        });
      } catch (error) {
        if (error === 'ZodError') {
          return validationResponse({
            res,
            error,
          });
        }
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

const UserDetails: Prisma.UserSelect = {
  _count: {
    select: {
      project: true,
    },
  },
  id: true,
  title: true,
  description: true,
  skills: true,
  socialSites: true,
  username: true,
};

async function getUserDetails(session: Session) {
  try {
    const data = await prisma.user.findFirst({
      where: { email: session.user?.email },
      select: UserDetails,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export type EditableUserDetails = {
  title: string;
  description: string;
  skills: string[];
  name?: string;
  image?: string;
  username?: string;
  socialSites?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    website?: string | null;
  };
};

async function updateUserDetails(args: EditableUserDetails, session: Session) {
  const { title, description, skills, socialSites } = args;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
      include: { socialSites: true }, // Include socialSites in the query
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const socialSitesData = {
      github: socialSites?.github || null,
      linkedin: socialSites?.linkedin || null,
      twitter: socialSites?.twitter || null,
      website: socialSites?.website || null,
    };

    // If the user already has socialSites, update them; otherwise, create new ones
    if (existingUser.socialSites) {
      // Update existing socialSites
      await prisma.socialSites.update({
        where: { id: existingUser.socialSitesId || '' }, // Assuming socialSitesId is non-null
        data: socialSitesData,
      });
    } else {
      // Create new socialSites and link to the existing user
      const createdSocialSites = await prisma.socialSites.create({
        data: {
          ...socialSitesData,
          User: { connect: { id: existingUser.id } },
        },
      });

      // Update the socialSitesId in the user record
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { socialSitesId: createdSocialSites.id },
      });
    }

    // Update the user details
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email || undefined },
      data: {
        title: title,
        description: description,
        skills: skills,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
