/*
  Warnings:

  - A unique constraint covering the columns `[cardNumber]` on the table `BankCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BankCard_cardNumber_key" ON "BankCard"("cardNumber");
