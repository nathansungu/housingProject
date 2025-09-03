import {NextFunction, Request, Response } from "express";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import z, {ZodError} from "zod";

export const errorHandler = (_req:Request, res:Response, error:Error, _next:NextFunction) => {
  console.error(error);
  if (error instanceof ZodError) {
    const prettyError = z.prettifyError(error);
    res.status(400).json({ message: prettyError });
    return;
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ message: "invalid token  login again " });
    return;
  }
  if (error instanceof TokenExpiredError) {
    res.status(401).json({ message: "expried token refresh or login again" });
    return;
  }
  if (
    error.message === "no such user found" ||
    error.message === "invalid credentials"
  ) {
    res.status(401).json({ message: "invalid credentials" });
  }











  res.status(500).json({ message: 'Internal Server Error' });
}