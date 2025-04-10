import express from "express";
import { createBankCard } from "../controller/bankCard/postBankCardController";

const router = express.Router();

router.post("/bank-card/:userId", createBankCard);

export default router;
