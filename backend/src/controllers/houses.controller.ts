import {
  addHousePicturesService,
  deleteHouseImgService,
  getAllHousesService,
  updateHousePicturesService,
  addHouseService,
  updateHouseService,
  deleteHouseService,
  getHouseService,
  addReviewService,
  getReviewsService,
  deleteReviewService,
  updateReviewService,
  getUserReviewsService,
} from "./../services/houses.service";
import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import {
  addHousePicturesValidation,
  addHouseValidation,
  deleteHousepictureValidation,
  getHousesValidation,
  updateHousePicturesValidation,
  updateHouseValidation,
} from "../zodValidation/houses";
import {
  addReviewValidation,
  deleteReviewValidation,
  getReviewsValidation,
  updateReviewValidation,
} from "../zodValidation/reviews";

export const addHouses = asyncHandler(async (req: Request, res: Response) => {
  const data = await addHouseValidation.parseAsync(req.body);
  const landlordId = req.user?.userId!;
  const house = await addHouseService({ ...data, landlordId });
  if (house)
    res.status(200).json({ message: "house added successfully", house });
  return;
});

export const updateHouse = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateHouseValidation.parseAsync(req.body);
  const landlordId = req.user?.userId;
  const houseId = req.params.housesInclude;
  const updatedHouse = await updateHouseService({
    ...data,
    landlordId,
    id: houseId,
  });
  if (updatedHouse)
    res
      .status(200)
      .json({ message: "house updated successfully", updatedHouse });
  return;
});

export const getAllHouses = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllHouses = await getAllHousesService();
    if (getAllHouses) res.status(200).json({ ...getAllHouses });
    return;
  }
);

//house pictures
export const addHousePictures = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await addHousePicturesValidation.parseAsync(req.body);
    const newHouse = await addHousePicturesService(data);
    if (newHouse)
      res
        .status(200)
        .json({ message: "pictures added successfully", newHouse });
    return;
  }
);

//update house pictures
export const updateHousePictures = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await updateHousePicturesValidation.parseAsync(req.body);
    const updatedPictures = await updateHousePicturesService(data);
    if (updatedPictures)
      res
        .status(200)
        .json({ message: "picture updated successfully", updatedPictures });
    return;
  }
);

//delete a house
export const deleteHouse = asyncHandler(async (req: Request, res: Response) => {
  const houseId = req.params.houseId;
  const landlordId = req.user?.userId;

  const deletedHouse = await deleteHouseService(houseId);
  if (deletedHouse)
    res
      .status(200)
      .json({ message: "house deleted successfully", deletedHouse });
  return;
});
//delete img

export const deleteHouseImg = asyncHandler(
  async (req: Request, res: Response) => {
    const { houseId, imgUrl } = await deleteHousepictureValidation.parseAsync(
      req.body
    );
    const updatedRecord = await deleteHouseImgService(houseId, imgUrl);
    if (updatedRecord)
      res
        .status(200)
        .json({ message: "image deleted successfully", updatedRecord });
    return;
  }
);

//search houses

export const getHouse = asyncHandler(async (req: Request, res: Response) => {
  const data = await getHousesValidation.parseAsync(req.params);
  const houses = await getHouseService(data);
  if (houses) {
    res.status(201).json(houses);
    return;
  }
});

//add review
export const addReview = asyncHandler(async (req: Request, res: Response) => {
  const data = await addReviewValidation.parseAsync(req.body);
  const userId = req.user?.userId!;
  const newReview = await addReviewService({ ...data, userId });
  if (newReview)
    res.status(201).json({ message: "review added successfully", newReview });
  return;
});

//get reviews // pass in user, review or houseid as id
export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const { id } = await getReviewsValidation.parseAsync(req.params);
  const reviews = await getReviewsService(id);
  if (reviews) res.status(200).json({ reviews });
});

//delete review
export const deleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { reviewId } = await deleteReviewValidation.parseAsync(req.body);
    const deletedReview = await deleteReviewService(reviewId);
    if (deletedReview)
      res
        .status(200)
        .json({ message: "review deleted successfully", deletedReview });
    return;
  }
);

//update review
export const updateReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { houseId, rating, comment, reviewId } =
      await updateReviewValidation.parseAsync(req.body);
    const userId = req.user?.userId!;
    const updatedReview = await updateReviewService({
      houseId,
      rating,
      comment,
      userId,
      id: reviewId,
    });
    if (updatedReview)
      res
        .status(200)
        .json({ message: "review updated successfully", updatedReview });
    return;
  }
);
