import { Request, Response, NextFunction } from "express";
import prisma from "../../../prismaClient";

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body || {};

  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    email.match(validRegex) &&
    email.includes(".com") &&
    email.includes("gmail")
  ) {
    const userEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userEmail) {
      res
        .status(400)
        .json({
          success: false,
          message: "Found user with this email",
        })
        .send();
    } else {
      next();
    }
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "Email format required",
      })
      .send();
  }
};
