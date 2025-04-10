import express from "express";
import { LoginUserController } from "../controller/userLogin/LoginUserController";
import { GetUserLoginController } from "../controller/userLogin/GetUserLoginController";
import { asyncHandler } from "../utils/asyncHandler";

export const LoginUserRouter = express.Router();

LoginUserRouter.post("/login", LoginUserController);
LoginUserRouter.get("/login", asyncHandler(GetUserLoginController));
