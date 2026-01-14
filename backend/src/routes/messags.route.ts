import { Router } from "express";
import {
  sendMessage,
  getHouseMessages,
  getUserMessages,
  deleteMessage,
  markMessageRead,
} from "../controllers/message.controller";
import verifyLogin from "../middlewares/verifylogin.middleware";
import { createRateLimiter } from "../middlewares/apiLimiting";
export const message = Router();

message.post("/", verifyLogin, createRateLimiter(60_000, 30), sendMessage);

message.delete(
  "/",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 20),
  deleteMessage
);

message.get(
  "/user",
  verifyLogin,
  createRateLimiter(60_000, 120),
  getUserMessages
);

message.get(
  "/house",
  verifyLogin,
  createRateLimiter(60_000, 120),
  getHouseMessages
);

message.patch(
  "/status",
  verifyLogin,
  createRateLimiter(60_000, 60),
  markMessageRead
);
