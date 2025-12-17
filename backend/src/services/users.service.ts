import { PrismaClient} from "@prisma/client"
import { Prisma } from "@prisma/client"
const client = new PrismaClient()
export const updateProfileService = async(data:Prisma.userUncheckedUpdateInput)=>{
    const {userId, id, ...others} = data
    const profile = await client.user.update({
        where:{userId:userId as string},
        data:{...others}
    })
    if(!profile){
        return Promise.reject(new Error("failed to update user")) 
    }
    return profile
}

export const updateContactsService =async(data:Prisma.contactsUncheckedUpdateInput)=>{
    const {userId, id, ...contacts}=data
    const contact = await client.contacts.update({
        where:{userId:userId as string},
        data:{...contacts}
    })
    if(!contact) return Promise.reject(new Error("failed to update user"))
    return contact
}