import { Request, Response } from "express";
import prisma from "../../../prismaClient";

export const GetBankCardController = async (req: Request, res: Response) => {
  const { userId } = req.query as unknown as { userId: string };

  if (!userId) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }

  try {
    const getBankCard = await prisma.bankCard.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    res.status(200).json({
      success: true,
      cards: getBankCard,
    });
    return;
  } catch (error) {
    console.error("Error fetching bank cards:", error);
    res.status(405).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }
};
