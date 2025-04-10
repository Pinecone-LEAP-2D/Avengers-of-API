import { Request, Response, NextFunction } from "express";
import prisma from "../../../prismaClient";

export const validateUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username } = req.body;
  console.log();
  if (username.length < 3) {
    res.status(400).json({
      success: false,
      message: "Username must be at least 3 characters long",
    });
    return;
  }

  const userNameFound = await prisma.user.findUnique({
    where: { username },
  });
  console.log(userNameFound);

  if (userNameFound) {
    res.status(400).json({
      success: false,
      message: "Username already taken, please choose another",
    });
    return;
  }

  next();
};
