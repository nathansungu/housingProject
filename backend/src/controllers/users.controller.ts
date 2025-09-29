import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { upateProfileValidation } from "../zodValidation/user";

export const  updateProfile = asyncHandler(async(req:Request, res:Response)=>{
    const data = await upateProfileValidation.parseAsync(req.body)
        
})