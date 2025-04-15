import express from "express";
import { EditProfileController } from "../controller/editProfile/EditProfile.controller";

export const EditProfileRouter = express.Router();

EditProfileRouter.patch("/edit", EditProfileController);
