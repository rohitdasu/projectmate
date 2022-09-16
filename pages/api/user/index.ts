import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import bodyValidator from '@/lib/bodyValidator';
import {
  errorResponse,
  successResponse,
  validationResponse,
} from '@/lib/http.response';
import { userSchema } from '@/schema/index';
import apiAuth from '@/lib/apiAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isAuth = await apiAuth(req);
  if (!isAuth) {
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
        const data = await getUsers();
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
        const validatedBody = await bodyValidator(req, userSchema);
        const { email, firebaseUID } = validatedBody;
        const data = await addUser({ email, firebaseUID });
        return successResponse({
          res,
          message: 'user created successfully',
          results: data,
          success: true,
          statusCode: 201,
        });
      } catch (error) {
        if (error.code === 'P2002') {
          return errorResponse({
            res,
            message: 'User already exist',
            statusCode: 200,
            success: false,
          });
        }
        if (error.name === 'ZodError') {
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

async function addUser(args: { email: string; firebaseUID: string }) {
  const { email, firebaseUID } = args;
  try {
    const data = await prisma.user.create({
      data: {
        firebaseUID,
        email,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    const data: User[] = await prisma.user.findMany();
    return data;
  } catch (error) {
    throw error;
  }
}
