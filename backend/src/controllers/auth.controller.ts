import {
  registerUserValidation,
  loginValidation,
  changePasswordValidation,
  forgotPasswordValidation,
} from "./../zodValidation/authentication";
import { asyncHandler } from "../utilities/asyncHandler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { changePasswordService, loginUserService, refreshTokenService, registerUserService } from "../services/auth.service";
const client = new PrismaClient();

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const registerData =
      await registerUserValidation.parseAsync(req.body);
    const newUser = await registerUserService(registerData);

    if (newUser) {
      res.status(200).json({ message: "user created successfully" });
    }
  }
);

//login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const loginData = await loginValidation.parseAsync(req.body);
  const login = await loginUserService(loginData.identifier, loginData.password);
  if (login) {
    res.status(200).json({...login});
    return
  }   

});

//refresh token
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ message: "refresh token is required" });
      return;
    }

    const newAccessToken = await refreshTokenService(refreshToken);
    if (newAccessToken) {
      res.status(200).json({ accessToken: newAccessToken });
      return;
    }
    res.status(400).json({ message: "invalid refresh token" });

  })

  //logout user

  //to do
  export const logoutUser = asyncHandler(async(req:Request, res:Response) =>{
  })

    
export const changePassword = asyncHandler(async(req:Request, res:Response) =>{
  const userId = req.user?.userId
  const { currentPassword, newPassword } = await changePasswordValidation.parseAsync(req.body)
  const updatedAuth = await changePasswordService(userId, newPassword, currentPassword)
  if(updatedAuth) return res.status(200).json({message: "password changed successfully"})
})


export const forgotPassword = asyncHandler(async(req:Request, res:Response) =>{
  const {identifier}= await forgotPasswordValidation.parseAsync(req.body)
  
})