import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { UserPayload } from "../../@types/types";

const verifyLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "missing token please refresh or login" });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_TOKEN_SECRET!
      ) as UserPayload;

      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "invalid token please refresh or login" });
    }
  }
);

export default verifyLogin;