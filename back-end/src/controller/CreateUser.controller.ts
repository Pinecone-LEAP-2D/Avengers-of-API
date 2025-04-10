import bcrypt from "bcrypt";
import { Request, Response } from "express";
import prisma from "../../prismaClient";

const saltRounds = 6;

export const CreateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  const cryptPassword = bcrypt.hashSync(password, saltRounds);

  try {
    const createUser = await prisma.user.create({
      data: {
        email: email,
        password: cryptPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return res.status(201).json({
      message: "user Created",
    });
  } catch (err) {
    console.log("Error creating user:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
