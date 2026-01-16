import { updateHousePictures } from './../controllers/houses.controller';
import {z} from "zod"
export const addHouseValidation = z.object({
    name: z.string(),
    roomType: z.string(),
    roomsNumber: z.int(),
    vacantUnits: z.int(),
    location: z.string(),
    description: z.string(),
    pricing: z.int(),
    waterBill: z.boolean(),
    electricBill: z.boolean(),
    wifi: z.boolean(),
    rentDeadline: z.string(),
    status: z.string(),

})

export const updateHouseValidation = z.object({
    landlordId: z.string(),
    name: z.string().optional(),
    roomType: z.string().optional(),
    roomsNumber: z.int().optional(),
    vacantUnits: z.int().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    pricing: z.int().optional(),
    waterBill: z.boolean().optional(),
    electricBill: z.boolean().optional(),
    wifi: z.boolean().optional(),
    rentDeadline: z.string().optional(),
    status: z.string().optional(),
})


export const addHousePicturesValidation = z.object({
    houseId: z.string(),
    imgUrl: z.array(z.string())
})

// update house pictures
export const updateHousePicturesValidation = z.object({
    houseId: z.string(),
    currentImgUrl: z.string(),
    newImgUrl: z.string()
    
})

//delete imgUrl 

export const deleteHousepictureValidation = z.object({
    houseId: z.string(),
    imgUrl: z.string()
})

export const getHousesValidation = z.object({
    houseId: z.string().optional(),
    landloardId: z.string().optional(),
    name: z.string().optional(),
    roomType: z.string().optional(),
    description: z.string().optional(),
    wifi: z.boolean().optional()
})