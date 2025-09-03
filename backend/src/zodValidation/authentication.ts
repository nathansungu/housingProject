import {string, z} from 'zod'

export const registerUserValidation = z.object({
    email: z.email(),
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6, "password should be at least 6 characters long"),
    confirmPassword: z.string().min(6, "confirm password should be at least 6 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    
})

export const loginValidation = z.object({
    identifier: z.string(),
    password: string()
})

export const changePasswordValidation = z.object({
    currentPassword: z.string().min(6, "current password should be at least 6 characters long"),
    newPassword: z.string().min(6, "new password should be at least 6 characters long")
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "new password must be different from current password",        
})

export const forgotPasswordValidation = z.object({
    identifier: z.string()
})
