import { SuiteContext } from "node:test";
import { Request, Response, NextFunction } from "express";

export const validateInputLength = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about, socialMediaURL, avatarImage } = req.body;

  if (name.length <= 3 && about.length <= 4) {
    res.status(400).json({
      success: false,
      message: "too short name at least 3 characters long",
    });
    return;
  }
  if (!socialMediaURL && !avatarImage) {
    res.status(400).json({
      success: false,
      message: "avatar or social media link reqiured",
    });
    return;
  }
  next();
};
