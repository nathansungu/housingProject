import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";

 const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
})

export const createRateLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => (redis.call as any)(...args),
    }),

    windowMs,
    max,

    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,

    keyGenerator: (req) => {
      if (req.user?.userId) return `user:${req.user.userId}`;
      return `ip:${ipKeyGenerator(req as any)}`;
    },

    handler: (_req, res) => {
      res.status(429).json({
        error: "Too many requests. Try again later.",
      });
    },
  });
};
