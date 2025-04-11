import express from "express";
import { CreateBankCardController } from "../controller/bankCard/postBankCardController";
import { GetBankCardController } from "../controller/bankCard/getBankCardController";

export const BankRouter = express.Router();

BankRouter.get("", GetBankCardController);
BankRouter.post("", CreateBankCardController);
