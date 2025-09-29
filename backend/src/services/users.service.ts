import { PrismaClient} from "@prisma/client"
import { Prisma } from "@prisma/client"
const client = new PrismaClient()
export const updateProfileService = async(data:Prisma.userUncheckedUpdateInput)=>{
    const {userId, id, ...others} = data
    const profile = await client.user.update({
        where:{userId:userId as string},
        data:{...others}
    })
}

export const updateContactsService =async(data:Prisma.contactsUncheckedUpdateInput)=>{
    const {userId, id, ...contacts}=data
    const constacts = await client.contacts.update({
        where:{userId:userId as string},
        data:{...contacts}
    })
}