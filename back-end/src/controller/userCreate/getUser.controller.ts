import prisma from "../../../prismaClient";
import { Request, Response } from "express";

export const GetUserController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({ message: "Login successful", users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
