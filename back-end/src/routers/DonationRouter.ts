import express from "express";
import { GetDonationController } from "../controller/donation/getDonation.controller";
import { CreateDonationController } from "../controller/donation/createDonation.controller";

export const DonationRouter = express.Router();

DonationRouter.get("", GetDonationController);
DonationRouter.post("", CreateDonationController);
