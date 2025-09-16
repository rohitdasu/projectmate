import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { apiLimiter } from './rateLimiter';

export const withRateLimit = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';
    const { success } = await apiLimiter.limit(ip);

    if (!success) {
      return res.status(429).json({
        error: 'Rate Limited',
        message: 'You have exceeded the rate limit. Please wait and try again.',
      });
    }

    return handler(req, res);
  };
};
