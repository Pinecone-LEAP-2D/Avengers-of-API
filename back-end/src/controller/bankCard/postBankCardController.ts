import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBankCard = async (req: Request, res: Response) => {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate, userId } =
      req.body;

    // Optional: Basic validation
    if (
      !country ||
      !firstName ||
      !lastName ||
      !cardNumber ||
      !expiryDate ||
      !userId
    ) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const newCard = await prisma.bankCard.create({
      data: {
        country: country,
        firstName: firstName,
        lastName: lastName,
        cardNumber: cardNumber,
        expiryDate: new Date(expiryDate),
        userId: parseInt(userId),
      },
    });

    res.status(201).json(newCard);
    return;
  } catch (error) {
    console.error("Create BankCard Error:", error);
    res.status(500).json({ message: "Something went wrong." });
    return;
  }
};
