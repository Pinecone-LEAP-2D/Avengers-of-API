import express from "express";
import { LoginUserController } from "../controller/userLogin/LoginUserController";

export const LoginUserRouter = express.Router();

LoginUserRouter.post("/login", LoginUserController);
