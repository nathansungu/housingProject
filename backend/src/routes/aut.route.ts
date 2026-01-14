import {
  loginUser,
  logoutUser,
  registerUser,
  changePassword,
  refreshToken,
  forgotPassword,
  logedInUser,
} from "../controllers/auth.controller";
import { Router } from "express";
import { createRateLimiter } from "../middlewares/apiLimiting";
import verifyLogin from "../middlewares/verifylogin.middleware";
const auth = Router();

auth.post("/register", createRateLimiter(60 * 60 * 1000, 3), registerUser);

auth.post("/login", createRateLimiter(60_000, 5), loginUser);

auth.post("/refresh", createRateLimiter(60_000, 30), refreshToken);

auth.get("/me", verifyLogin, createRateLimiter(60_000, 120), logedInUser);

auth.post("/logout", verifyLogin, createRateLimiter(60_000, 30), logoutUser);

auth.patch(
  "/password",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 5),
  changePassword
);

auth.post(
  "/forgot-password",
  createRateLimiter(60 * 60 * 1000, 3),
  forgotPassword
);

export default auth;
