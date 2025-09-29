import { z} from 'zod'
export const updateContactsValidation = z.object({
    phoneNo: z.string() .optional(),
    email: z.email().optional()
})

export const upateProfileValidation = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    imgUrl: z.string().optional()
})

