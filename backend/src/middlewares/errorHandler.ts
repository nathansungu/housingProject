import {NextFunction, Request, Response } from "express";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import z, {ZodError} from "zod";

export const errorHandler = (error:Error, _req:Request, res:Response, next:NextFunction) => {
  
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
 
  if (error.message === "invalid tokens" || error.message === "invalid refresh token") {
    res.status(401).json({ message: "Invalid tokens. Please login to continue." });
    return;
  }

  if (error.message === "invalid credentials") {
    res.status(401).json({ message: "Invalid credentials." });
    return;
  }

  if (error.message === "user not created") {
    res.status(400).json({ message: "Failed to create account. Please try again later." });
    return;
  }

  // houses errors
  if (error.message === "house not found") {
    res.status(404).json({ message: "House not found." });
    return;
  }

    if (error.message === "invalid house") {
    res.status(400).json({ message: "Invalid house data provided." });
    return;
  }

  if (error.message ==="picture not added"||
      error.message ==="house not updated"||
      error.message ==="house not created"||
      error.message ==="house not deleted"
  ) {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error.message === "you are not authorized to update this house") {
    res.status(403).json({ message: "You are not authorized to update this house." });
    return;
  }

  if (error.message === "failed to update user") {
    res.status(400).json({ message: "Failed to update user profile." });
    return;
  }
  res.status(500).json({ message: 'Internal Server Error' });
}