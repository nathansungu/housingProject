import {z} from 'zod'
export const addReviewValidation = z.object({
    houseId: z.string(),
    rating: z.int() .min(1, 'rating can not be less than one') .max(5, 'rating must not be greater than five'),
    comment: z.string()
})

export const updateReviewValidation = z.object({
    houseId: z.string(),
    reviewId: z.string(),
    rating: z.int() .min(1, 'rating can not be less than one') .max(5, 'rating must not be greater than five').optional(),
    comment: z.string().optional()   
})
export const deleteReviewValidation = z.object({
    reviewId: z.string(),
})
export const getReviewsValidation = z.object({
    houseId: z.string(),
})

