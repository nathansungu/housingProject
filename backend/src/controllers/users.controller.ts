import { updateContactsValidation } from './../zodValidation/user';
import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { upateProfileValidation } from "../zodValidation/user";
import { updateContactsService, updateProfileService } from "../services/users.service";
export const  updateProfile = asyncHandler(async(req:Request, res:Response)=>{
    const data = await upateProfileValidation.parseAsync(req.body)
    const userId = req.user?.userId
    const profile =  await updateProfileService({...data , userId})
    if(profile){
        res.status(200).json("profile updated successfully")
    }
})

export const updateContacts = asyncHandler(async(req:Request, res:Response)=>{
    const data = await updateContactsValidation.parseAsync(req.body)
    const userId = req.user?.userId
    const contact  = await updateContactsService({...data, userId})
    if(contact){
        res.status(200).json("contacts updated Succesfully")
    }

})