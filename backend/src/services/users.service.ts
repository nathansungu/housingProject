import prisma from "../prismaClient"
import { Prisma } from "@prisma/client"
import { UpdateProfileInput } from "../../@types/users"
export const updateProfileService = async(data:UpdateProfileInput)=>{
    
    const { userId, ...others} = data
    const profile = await prisma.user.update({
        where:{id: userId   as string},
        data:{...others} as any
    })
    if(!profile){
        return Promise.reject(new Error("failed to update user")) 
    }
    return profile
}

export const updateContactsService =async(data:{userId: string, phone?: string | null, email?: string | null})=>{
    const { userId, ...contacts}=data
    const contact = await prisma.contacts.update({
        where:{userId:userId as string},
        data:{...contacts} as any
    })
    if(!contact) return Promise.reject(new Error("failed to update user"))
    return contact
}