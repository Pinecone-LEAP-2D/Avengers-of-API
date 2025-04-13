import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const GetDonationController = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId?: string };

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const donations = await prisma.donation.findMany({
      where: {
        donorId: parseInt(userId),
      },
      select: {
        recipient: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        amount: true,
        donor: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        specialMessage: true,
        createdAt: true,
      },
    });

    res.status(200).json({ donations });
    return;
  } catch (error) {
    console.error("GetDonationController error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
