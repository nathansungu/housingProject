import { Router } from "express";
import {
  addHousePictures,
  addHouses,
  deleteHouse,
  updateHouse,
  updateHousePictures,
  deleteHouseImg,
  getHouse,
  getAllHouses,
  deleteReview,
  addReview,
  getReviews,
  updateReview,
} from "../controllers/houses.controller";
import verifyLogin from "../middlewares/verifylogin.middleware";
import { createRateLimiter } from "../middlewares/apiLimiting";
export const houses = Router();
houses.post("/", verifyLogin, createRateLimiter(60 * 60 * 1000, 20), addHouses);

houses.post(
  "/pictures",
  verifyLogin,
  createRateLimiter(60_000, 10),
  addHousePictures
);

houses.delete(
  "/",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 10),
  deleteHouse
);

houses.delete(
  "/pictures",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 10),
  deleteHouseImg
);

houses.patch(
  "/",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 20),
  updateHouse
);

houses.patch(
  "/pictures",
  verifyLogin,
  createRateLimiter(60_000, 15),
  updateHousePictures
);

houses.get("/:id", createRateLimiter(60_000, 200), getHouse);

houses.get("/", createRateLimiter(60_000, 300), getAllHouses);

houses.post("/reviews", verifyLogin, createRateLimiter(60_000, 20), addReview);

houses.patch(
  "/reviews",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 10),
  updateReview
);

houses.delete(
  "/reviews",
  verifyLogin,
  createRateLimiter(10 * 60 * 1000, 10),
  deleteReview
);

houses.get("/reviews/:id", createRateLimiter(60_000, 200), getReviews);
