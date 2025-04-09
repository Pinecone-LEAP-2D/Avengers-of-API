import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.send({ test: "test" });
  } catch (error) {}
};
