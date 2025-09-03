import {z} from "zod"
export const sendMessage = z.object({
    senderId: z.string(),
    receiverId: z.string(),
    message: z.string(),
    houseId: z.string().optional()
})

export const deleteMessage = z.object({
    messageId: z.string()
})

export const getMessagesByHouse = z.object({
    houseId: z.string()
})

export const getMessagesByUser = z.object({
    userId: z.string()
})

export const markMessagesAsRead = z.object({
    messageId: z.array(z.string())
})

