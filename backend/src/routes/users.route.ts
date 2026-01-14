import { Router } from "express";
import {updateContacts,updateProfile} from "../controllers/users.controller"
import verifyLogin from "../middlewares/verifylogin.middleware";
import { createRateLimiter } from "../middlewares/apiLimiting";
export const users = Router()

users.patch(
  "/profile",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 10),
  updateProfile
);

users.patch(
  "/contacts",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 5),
  updateContacts
);

