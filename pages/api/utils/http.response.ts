/**
 * @desc    Send any success response
 */
export /** */
const success = (args: {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  statusCode: number;
}) => {
  const { message, results, statusCode } = args;
  return {
    message: message ? message : '',
    error: false,
    code: statusCode,
    results,
  };
};

/**
 * @desc    Send any error response
 */
export const error = (args: { message: string; statusCode: number }) => {
  const { message, statusCode } = args;
  return {
    message,
    code: statusCode,
    error: true,
  };
};
