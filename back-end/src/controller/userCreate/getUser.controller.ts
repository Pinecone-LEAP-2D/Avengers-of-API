import prisma from "../../../prismaClient";
import { Request, Response } from "express";

export const GetUserController = async (req: Request, res: Response) => {

  const { username } = req.query as unknown as { username: string };

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error fetching username");
  }
};
