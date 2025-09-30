import {boolean, z} from "zod"
export const sendMessageValidation = z.object({
    senderId: z.string(),
    receiverId: z.string(),
    message: z.string(),
    houseId: z.string().optional()
})

export const messageIdValidation = z.object({
    messageId: z.string()
})

export const houseIdValidation = z.object({
    houseId: z.string()
})

export const messageStatusValidation = z.object({
    status: z.boolean()
})




