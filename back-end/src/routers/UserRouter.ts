import express from "express";
import { validateEmail } from "../middlewares/userLogin/validationEmail";
import { validatePassword } from "../middlewares/userLogin/validationPassword";
import { CreateUserController } from "../controller/userCreate/CreateUser.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { GetUserController } from "../controller/userCreate/getUser.controller";

export const UserRouter = express.Router();

UserRouter.post(
  "/sign-up",
  validateEmail,
  validatePassword,
  asyncHandler(CreateUserController)
);
UserRouter.get("/sign-up", asyncHandler(GetUserController));
