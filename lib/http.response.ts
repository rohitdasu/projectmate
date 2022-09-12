import { NextApiResponse } from 'next';

/**
 * @desc    Send any success response
 */
export /** */
const successResponse = (args: {
  res: NextApiResponse;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  success: boolean;
  statusCode: number;
}) => {
  const { res, message, results, success, statusCode } = args;
  return res.status(statusCode).json({
    message: message,
    success: success,
    results,
  });
};

/**
 * @desc    Send any error response
 */
export const errorResponse = (args: {
  res: NextApiResponse;
  message: string;
  statusCode: number;
  success: boolean;
}) => {
  const { res, message, success, statusCode } = args;
  res.status(statusCode).json({
    success: success,
    message,
  });
};
