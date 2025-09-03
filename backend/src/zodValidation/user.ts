import { z} from 'zod'
export const updateContacts = z.object({
    phoneNo: z.string() .optional(),
    email: z.email().optional()
})

export const upateProfile = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    imgUrl: z.string().optional()
})

