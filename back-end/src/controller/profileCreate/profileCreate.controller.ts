import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const ProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, about, socialMediaURL, avatarImage } = req.body;
  try {
    const profileUser = await prisma.profile.create({
      data: {
        name: name,
        about: about,
        socialMediaURL: socialMediaURL,
        avatarImage: avatarImage,
        successMessage: "Profile created successfully",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      profile: profileUser,
    });
  } catch (error) {
    console.log("Error creating profile:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
