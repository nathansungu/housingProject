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
    landloardId: z.string(),
    name: z.string().optional(),
    roomType: z.string().optional(),
    roomsNumber: z.int().optional(),
    vacantUnits: z.int().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    price: z.int().optional(),
    waterBill: z.boolean().optional(),
    electictBill: z.boolean().optional(),
    wifi: z.boolean().optional(),
    rentDeadline: z.string().optional(),
    status: z.string().optional(),
})


export const addHousePictures = z.object({
    houseId: z.string(),
    imgUrl: z.array(z.string())
})


