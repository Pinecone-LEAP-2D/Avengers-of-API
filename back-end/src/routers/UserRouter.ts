import express from "express";
import { GetUserController } from "../controller/getUser.controller";
import { validateEmail } from "../middlewares/userLogin/validationEmail";
import { validatePassword } from "../middlewares/userLogin/validationPassword";
import { CreateUserController } from "../controller/CreateUser.controller";

export const UserRouter = express.Router();

UserRouter.post(
  "/sign-up",
  validateEmail,
  validatePassword,
  CreateUserController
);
