import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const reqNum = 10;
const reqTime = '1 m';
const reqTimeout = 1000;

export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(reqNum, reqTime),
  analytics: true,
  timeout: reqTimeout,
});
