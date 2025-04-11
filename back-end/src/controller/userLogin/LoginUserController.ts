import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../prismaClient";

export const LoginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password is required",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: userFound.id,
        email: userFound.email,
        username: userFound.username,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    const { password: passRemove, ...userData } = userFound;

    res.status(200).json({
      success: true,
      user: userData,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
