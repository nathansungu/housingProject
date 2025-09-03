import {z} from 'zod'
export const addReview = z.object({
    houseId: z.string(),
    rating: z.int() .min(1, 'rating can not be less than one') .max(5, 'rating must not be greater than five'),
    comment: z.string()
})

export const updateReview = z.object({
    houseId: z.string().optional(),
    rating: z.int() .min(1, 'rating can not be less than one') .max(5, 'rating must not be greater than five').optional(),
    comment: z.string().optional()   
})

