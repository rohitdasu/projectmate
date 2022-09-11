import { NextApiRequest, NextApiResponse } from 'next';
import { addUser, getUsers } from './service/user.service';
import { errorResponse, successResponse } from './utils/http.response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle post request
  if (req.method === 'POST') {
    const { email, firebaseUID } = req.body;
    try {
      const data = await addUser({ email, firebaseUID });
      return successResponse({
        res,
        message: 'user created successfully',
        results: data,
        error: false,
        statusCode: 201,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return errorResponse({
          res,
          message: 'User already exist',
          statusCode: 400,
        });
      }
      return errorResponse({
        res,
        message: 'Internal Error',
        statusCode: 500,
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const data = await getUsers();
      return successResponse({
        res,
        message: '',
        results: data,
        statusCode: 200,
        error: false,
      });
    } catch (error) {
      return errorResponse({
        res,
        message: 'Internal Error',
        statusCode: 500,
      });
    }
  }

  return errorResponse({
    res,
    message: 'Bad Request',
    statusCode: 400,
  });
}
