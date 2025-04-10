import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateInputLength } from "../middlewares/profileValidation/validationInputLength";
import { ProfileController } from "../controller/profileCreate/profileCreate.controller";

export const ProfileRouter = express.Router();

ProfileRouter.post("/", validateInputLength, asyncHandler(ProfileController));
