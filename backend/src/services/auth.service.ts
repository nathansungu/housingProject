import Prisma from "@prisma/client";
import { hash, compare } from "bcrypt";
import e from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
const client = new Prisma.PrismaClient();
type RegisterUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};
export const registerUserService = async ({
  email,
  firstName,
  lastName,
  userName,
  password,
}: RegisterUserInput) => {
  const bcryptPassword = await hash(password, 10);
  const newUser = await client.auth.create({
    data: {
      email,
      userName,
      password: bcryptPassword,
      user: {
        create: {
          firstName,
          lastName,
          contacts: {
            create: { email },
          },
        },
      },
    },
  });

  if (!newUser) return Promise.reject(new Error("user not created"));
  return newUser;
};

export const loginUserService = async (
  identifier: string,
  password: string
) => {
  const isValidUser = await client.auth.findFirst({
    where: { OR: [{ email: identifier }, { userName: identifier }] },
  });
  if (!isValidUser) return Promise.reject(new Error("no such user found"));
  const isPasswordValid = await compare(password, isValidUser.password);
  if (!isPasswordValid) return Promise.reject(new Error("invalid credentials"));

  //crete jwt token
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  const accessToken = sign(
    { userId: isValidUser.id },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
  const refreshToken = sign(
    { userId: isValidUser.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "5d" }
  );

  return { accessToken, refreshToken };
};

export const refreshTokenService = (refreshToken: string) => {
  const { userId } = verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as JwtPayload;
  if (!userId) return;
  const accessToken = sign({ userId }, process.env.JWT_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
  return accessToken;
};
//TO DO
export const logoutUserService = async (userId: string) => {};


export const changePasswordService = async (
  userId: string,
  newPassword: string,
  currentPassword: string
) => {
  const user = await client.auth.findUnique({
    where: { id: userId },
  });
  if (!user) return Promise.reject(new Error("no such user found"));
  const isValid = await compare(currentPassword, user!.password);
  if (!isValid) return Promise.reject(new Error("invalid credentials"));
  const passwordHash = await hash(newPassword, 10);
  const auth = await client.auth.update({
    where: { id: userId },
    data: { password: passwordHash },
  });
  return auth;
};


export const forgotPasswordService = async (identifier: string) => {
  const user = await client.auth.findFirst({
    where: { OR: [{ email: identifier }, { userName: identifier }] },
  });
  if (!user) return Promise.reject(new Error("no such user found"));

  //send email to user with reset link

}


