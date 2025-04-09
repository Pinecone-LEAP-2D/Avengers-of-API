import express from "express";
import { getUser } from "../controller/getUser.controller";

export const UserRouter = express.Router();

UserRouter.get("/", getUser);
