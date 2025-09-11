import { verify, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler";


const verifyLogin = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "missing token please refresh or login" });
    return;
  }
  
  try {
    const decode = verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as JwtPayload;
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token please refresh or login" });
    return;
  }
});
export default verifyLogin;
