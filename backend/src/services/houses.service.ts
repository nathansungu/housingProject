import { addHousePictures } from './../zodValidation/houses';
import { houses } from "./../../node_modules/.prisma/client/index.d";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
const client = new PrismaClient();
//To do: add house pictures service
//To do: delete house service
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


const HousePicturesService = async(data: {houseId: string, imgUrl: string[]}) =>{

}