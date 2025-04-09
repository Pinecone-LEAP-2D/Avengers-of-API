import bcrypt from "bcrypt";
import { Request, Response } from "express";
import prisma from "../../prismaClient";

const saltRounds = 6;

export const CreateUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  console.log({ email });

  //   Hash the password
  const cryptPassword = bcrypt.hashSync(password, saltRounds);

  try {
    // Create the user in the database with createdAt and updatedAt fields
    const createUser = await prisma.user.create({
      data: {
        email: email,
        password: cryptPassword,
        createdAt: new Date(), // Manually set the createdAt
        updatedAt: new Date(), // Manually set the updatedAt
      },
    });

    // Send success response
    res.status(200).json({
      success: true,
      user: createUser,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    // Log the error for debugging
    console.error("Error creating user:", err);

    // Send error response
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
