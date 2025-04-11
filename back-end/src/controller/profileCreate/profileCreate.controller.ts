import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const ProfileController = async (req: Request, res: Response) => {
  const { name, about, socialMediaURL, avatarImage, userId } = req.body;

  if (!userId || typeof userId !== "number") {
    res.status(400).json({
      success: false,
      message: "Valid userId is required.",
    });
    return;
  }

  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      res.status(409).json({
        success: false,
        message: "Profile already exists.",
      });
      return;
    }

    const profileUser = await prisma.profile.create({
      data: {
        name,
        about,
        socialMediaURL,
        avatarImage,
        successMessage: "Profile created successfully",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
      },
    });

    res.status(201).json({
      success: true,
      profile: profileUser,
      message: "Profile created successfully",
    });
    return;
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
