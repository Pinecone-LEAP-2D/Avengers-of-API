import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import bcrypt from "bcrypt"; // If password needs hashing

export const EditProfileController = async (req: Request, res: Response) => {
  const {
    name,
    about,
    avatarImage,
    socialMediaURL,
    successMessage,
    userId,
    password,
    bankCard,
  } = req.body;

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        successMessage,
        user: password
          ? {
              update: {
                password: await bcrypt.hash(password, 10),
              },
            }
          : undefined,
      },
      include: {
        user: true,
      },
    });

    let updatedCard = null;
    if (bankCard?.id) {
      updatedCard = await prisma.bankCard.update({
        where: { id: bankCard.id },
        data: {
          country: bankCard.country,
          firstName: bankCard.firstName,
          lastName: bankCard.lastName,
          cardNumber: bankCard.cardNumber,
          expiryDate: new Date(bankCard.expiryDate),
        },
      });
    }

    res.status(200).json({
      profile: updatedProfile,
      bankCard: updatedCard,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
