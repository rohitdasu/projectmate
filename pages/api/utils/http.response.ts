import { NextApiResponse } from 'next';

/**
 * @desc    Send any success response
 */
export /** */
const successResponse = (args: {
  res: NextApiResponse;
  message: string | '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  error: boolean | false;
  statusCode: number | 200;
}) => {
  const { res, message, results, statusCode } = args;
  return res.status(statusCode).json({
    message: message,
    error: false,
    results,
  });
};

/**
 * @desc    Send any error response
 */
export const errorResponse = (args: {
  res: NextApiResponse;
  message: string | 'Internal Server Error';
  statusCode: number | 500;
}) => {
  const { res, message, statusCode } = args;
  res.status(statusCode).json({
    error: true,
    message,
  });
};
