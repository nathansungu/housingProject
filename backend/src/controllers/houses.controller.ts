import {
  addHousePicturesService,
  deleteHouseImgService,
  getAllHousesService,
  updateHousePicturesService,
  addHouseService,
  updateHouseService,
  deleteHouseService,
  getHouseService,
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

export const addHouses = asyncHandler(async (req: Request, res: Response) => {
  const data = await addHouseValidation.parseAsync(req.body);
  const landlordId = req.userId;
  const house = await addHouseService({ ...data, landlordId });
  if (house)
    res.status(200).json({ message: "house added successfully", house });
  return;
});

export const updateHouse = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateHouseValidation.parseAsync(req.body);
  const landlordId = req.userId;
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
    if (getAllHouses) res.status(200).json({ houses: getAllHouses });
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
  const landlordId = req.userId;

  const deletedHouse = await deleteHouseService(houseId);
  if (deletedHouse)
    res
      .status(200)
      .json({ message: "house deleted successfully", deletedHouse });
  return;
}
)
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

export const getHouse = asyncHandler(async(req:Request, res:Response)=>{
  const data = await getHousesValidation.parseAsync(req.body)
  const houses = await getHouseService(data)
  if(houses){
    res.status(201).json(houses)
    return
  }
})