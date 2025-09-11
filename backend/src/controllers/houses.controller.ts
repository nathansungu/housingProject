import { getAllHousesService } from './../services/houses.service';
import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import {
  addHouseValidation,
  updateHouseValidation,
} from "../zodValidation/houses";

//import services
import {
  addHouseService,
  updateHouseService,
} from "../services/houses.service";
import { get } from "http";

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


export const getAllHouses = asyncHandler(async(req:Request, res:Response) =>{
    const getAllHouses = await getAllHousesService()
    if(getAllHouses) return res.status(200).json({houses: getAllHouses})
})