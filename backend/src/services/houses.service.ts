import prisma from "../prismaClient";
import {
  addReviewType,
  CreateHouse,
  CreateHousePictures,
  UpdateHouse,
  UpdateReviewType,
} from "../../@types/houses";

export const getAllHousesService = async () => {
  const houses = await prisma.houses.findMany();
  if (!houses) return Promise.reject(new Error("no houses found"));
  return houses;
};

export const addHouseService = async (data: CreateHouse) => {
  const newHouse = await prisma.houses.create({
    data: data,
  });
  if (!newHouse) return Promise.reject(new Error("house not created"));
  return newHouse;
};

export const updateHouseService = async (data: UpdateHouse) => {
  const houseOwnerId = await prisma.houses.findUnique({
    where: { id: data.id as string },
    select: { landlordId: true },
  });
  // restrict update to house owner only
  if (houseOwnerId?.landlordId != data.landlordId)
    return Promise.reject(
      new Error("you are not authorized to update this house")
    );

  const updatedHouse = await prisma.houses.update({
    where: {
      id: data.id as string,
    },
    data: data,
  });
  if (!updatedHouse) return Promise.reject(new Error("house not updated"));
  return updatedHouse;
};

// add pictures to a house
export const addHousePicturesService = async (data: CreateHousePictures) => {
  const newPictures = await prisma.housePictures.create({
    data: data,
  });
  if (!newPictures) return Promise.reject(new Error("pictures not added"));
  return newPictures;
};
// update house pictures
export const updateHousePicturesService = async (data: {
  houseId: string;
  currentImgUrl: string;
  newImgUrl: string;
}) => {
  // Fetch existing house
  const house = await prisma.housePictures.findUnique({
    where: { houseId: data.houseId },
    select: { imgUrl: true },
  });

  if (!house) {
    return Promise.reject(new Error("Invalid house"));
  }

  // Replace currentImgUrl with newImgUrl
  const updatedImgUrls = house.imgUrl.map((url: string) =>
    url === data.currentImgUrl ? data.newImgUrl : url
  );

  //update in DB
  const updatedHouse = await prisma.housePictures.update({
    where: { houseId: data.houseId },
    data: { imgUrl: updatedImgUrls },
  });

  return updatedHouse;
};

export const deleteHouseImgService = async (
  houseId: string,
  imgUrl: string,
) => {
  const house = await prisma.housePictures.findUnique({
    where: { houseId },
    select: { imgUrl: true },
  });

  if (!house) {
    throw new Error("Invalid house");
  }
  const updatedArray = house.imgUrl.filter((url: string) => url !== imgUrl);

  const updatedHouse = await prisma.housePictures.update({
    where: { houseId },
    data: { imgUrl: updatedArray },
  });

  return updatedHouse;
};

//delete a house
export const deleteHouseService = async (houseId: string) => {
  const deletedHouse = await prisma.houses.update({
    where: { id: houseId },
    data: { isDeleted: true },
  });
  if (!deletedHouse) return Promise.reject(new Error("house not deleted"));
  return deletedHouse;
};

//search for a house
export const getHouseService = async (data: {
  houseId?: string | undefined;
  landloardId?: string | undefined;
  name?: string | undefined;
  roomType?: string | undefined;
  description?: string | undefined;
  wifi?: boolean | undefined;
}) => {
  const getHouse = await prisma.houses.findMany({
    where: {
      OR: [
        { id: data.houseId },
        { landlordId: data.landloardId },
        { name: data.name },
        { roomType: data.roomType },
        { description: data.description },
        { wifi: data.wifi },
      ],
    },
  });

  if (!getHouse) return Promise.reject(new Error("house not found"));

  return getHouse;
};

// add review
export const addReviewService = async (data: addReviewType) => {
  const newReview = await prisma.review.create({ data });
  if (!newReview) return Promise.reject(new Error("review not added"));
  return newReview;
};

// get reviews for a house
export const getReviewsService = async (id: string) => {
  const reviews = await prisma.review.findMany({
    where: { OR: [{ id: id }, { userId: id }, { houseId: id }] },
  });
  if (!reviews) return Promise.reject(new Error("no reviews found"));
  return reviews;
};

// delete review
export const deleteReviewService = async (reviewId: string) => {
  const deletedReview = await prisma.review.update({
    where: { id: reviewId },
    data: { isDeleted: true },
  });
  if (!deletedReview) return Promise.reject(new Error("review not deleted"));
  return deletedReview;
};

// update review
export const updateReviewService = async (data: UpdateReviewType) => {
  const { id, ...others } = data;
  const updatedReview = await prisma.review.update({
    where: { id: data.id },
    data: others,
  });
  if (!updatedReview) return Promise.reject(new Error("review not updated"));
  return updatedReview;
};

// get all reviews for a user
export const getUserReviewsService = async (userId: string) => {
  const reviews = await prisma.review.findMany({
    where: { userId },
  });
  if (!reviews)
    return Promise.reject(new Error("no reviews found for this user"));
  return reviews;
};
