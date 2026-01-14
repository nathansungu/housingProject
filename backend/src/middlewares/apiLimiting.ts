//set up redis client
import Redis from "ioredis";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

export const createRateLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (command: string, ...args: string[]) => {
        return (redis.call as any)(command, ...args);
      },
    }),

    windowMs,
    max,

    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,

    keyGenerator: (req) => {
      const base = req.user?.userId || req.ip;
      return `${req.path}:${base}`;
    },

    handler: (_req, res) => {
      res.status(429).json({
        error: "Too many requests. Try again later.",
      });
    },
  });
};
