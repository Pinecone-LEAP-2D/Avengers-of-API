import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const GetProfileController = async (req: Request, res: Response) => {
  const { userId } = req.query as unknown as { userId: string };

  if (!userId) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: parseInt(userId),
      },
      // select: {
      //   id: true,
      //   user: true,
      //   name: true,
      // },
      include: {
        user: {
          include: {
            bankCard: true,
          },
        },
      },
    });

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      profile,
    });
    return;
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
