import { Request, Response } from "express"; // make sure you import these
import prisma from "../../../prismaClient";

export const UserGetUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        profile: {
          select: {
            name: true,
            about: true,
            socialMediaURL: true,
            avatarImage: true,
          },
        },
      },
    });

    res.status(200).json(users);
    return;
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });

    return;
  }
};
