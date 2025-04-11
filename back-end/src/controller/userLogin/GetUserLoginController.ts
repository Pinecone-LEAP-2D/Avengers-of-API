import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const GetUserLoginController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
