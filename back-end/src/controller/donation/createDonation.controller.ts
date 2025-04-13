import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const CreateDonationController = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      specialMessage,
      socialURLOrBuyMeACoffee,
      donorId,
      recipientId,
    } = req.body;

    if (
      !amount ||
      !specialMessage ||
      !socialURLOrBuyMeACoffee ||
      !donorId ||
      !recipientId
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newDonation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId: Number(donorId),
        recipientId: Number(recipientId),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      message: "Donation created successfully",
      donation: newDonation,
    });
    return;
  } catch (error) {
    console.error("CreateDonationController error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
