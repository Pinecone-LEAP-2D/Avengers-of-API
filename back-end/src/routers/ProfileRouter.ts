import express from "express";
import { validateInputLength } from "../middlewares/profileValidation/validationInputLength";
import { ProfileController } from "../controller/profileCreate/profileCreate.controller";
import { GetProfileController } from "../controller/profileCreate/getProfile.controller";
import { UserGetUsers } from "../controller/userCreate/UserGetUsers.controller";

export const ProfileRouter = express.Router();
ProfileRouter.get("/", GetProfileController);
ProfileRouter.get("/users", UserGetUsers);
ProfileRouter.post("/", validateInputLength, ProfileController);
