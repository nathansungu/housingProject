import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { id } from "zod/v4/locales/index.cjs";
const client = new PrismaClient();

//To do: get single house service
//To do: get houses by landlord service
//To do: get houses by location service
//To do: get houses by price range service
//
export const getAllHousesService = async () => {
  const houses = await client.houses.findMany();
  if (!houses) return Promise.reject(new Error("no houses found"));
  return houses;
};

export const addHouseService = async (
  data: Prisma.housesUncheckedCreateInput
) => {
  const newHouse = await client.houses.create({
    data: data,
  });
  if (!newHouse) return Promise.reject(new Error("house not created"));
  return newHouse;
};

export const updateHouseService = async (
  data: Prisma.housesUncheckedUpdateInput
) => {
  const houseOwnerId = await client.houses.findUnique({
    where: { id: data.id as string },
    select: { landlordId: true },
  });
  // restrict update to house owner only
  if (houseOwnerId != data.landlordId)
    return Promise.reject(
      new Error("you are not authorized to update this house")
    );
  if (houseOwnerId?.landlordId !== data.landlordId)
    return Promise.reject(
      new Error("you are not authorized to update this house")
    );
  const updatedHouse = await client.houses.update({
    where: {
      id: data.id as string,
    },
    data: data,
  });
  if (!updatedHouse) return Promise.reject(new Error("house not updated"));
  return updatedHouse;
};

// add pictures to a house
export const addHousePicturesService = async (
  data: Prisma.housePicturesUncheckedCreateInput
) => {
  const newPictures = await client.housePictures.create({
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
  const house = await client.housePictures.findUnique({
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
  const updatedHouse = await client.housePictures.update({
    where: { houseId: data.houseId },
    data: { imgUrl: updatedImgUrls },
  });

  return updatedHouse;
};

export const deleteHouseImgService = async (
  houseId: string,
  imgUrl: string
) => {
  const house = await client.housePictures.findUnique({
    where: { houseId },
    select: { imgUrl: true },
  });

  if (!house) {
    throw new Error("Invalid house");
  }
  const updatedArray = house.imgUrl.filter((url: string) => url !== imgUrl);

  const updatedHouse = await client.housePictures.update({
    where: { houseId },
    data: { imgUrl: updatedArray },
  });

  return updatedHouse;
};

//delete a house
export const deleteHouseService = async (houseId: string) => {
  const deletedHouse = await client.houses.update({
    where: { id: houseId },
    data: { isDeleted: true },
  });
  if (!deletedHouse) return Promise.reject(new Error("house not deleted"));
  return deletedHouse;
};

//search for a house
export const getHouseService = async (
   data: {
    houseId?: string | undefined;
    landloardId?: string | undefined;
    name?: string | undefined;
    roomType?: string | undefined;
    description?: string | undefined;
    wifi?: boolean | undefined;
}
) => {
  const getHouse = await client.houses.findMany({
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
