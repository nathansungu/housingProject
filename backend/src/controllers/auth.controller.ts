import { logoutUserService } from './../services/auth.service';
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
import { message } from "../routes/messags.route";
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
    // set cookie for access token and refresh token
    res
    .cookie("accessToken", login.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000, 
    }   
  )
    .cookie("refreshToken", login.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000, 
    })
    .status(200)
    .json({message: "login successful" });
    return
  }   

});

//refresh token
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).json({ message: "refresh token is required" });
      return;
    }

    const newAccessToken =  refreshTokenService(refreshToken);
    if (newAccessToken) {
      res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000, 
      })
      .status(200)
      .json({ accessToken: newAccessToken });
      return;
    }
    res.status(400).json({ message: "invalid refresh token" });

  })

  
  export const logoutUser = asyncHandler(async(req:Request, res:Response) =>{
    const {accessToken, refreshToken} = req.cookies;
    
    if (!accessToken || !refreshToken) {
      return res.status(400).json({message: "no tokens found"})
    }
    const logout= await logoutUserService(accessToken, refreshToken)
    if (logout) {
      res.status(200).json({message: "logout successful"})
      return
    }
  })

    
export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.authid;

    const { currentPassword, newPassword } =
      await changePasswordValidation.parseAsync(req.body);

    await changePasswordService(userId, newPassword, currentPassword);

    return res.status(200).json({
      message: "Password changed successfully",
    });
  }
);



export const forgotPassword = asyncHandler(async(req:Request, res:Response) =>{
  const {identifier}= await forgotPasswordValidation.parseAsync(req.body)
  
})