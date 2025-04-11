/*
  Warnings:

  - You are about to drop the `_BankCardToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BankCardToUser" DROP CONSTRAINT "_BankCardToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BankCardToUser" DROP CONSTRAINT "_BankCardToUser_B_fkey";

-- DropTable
DROP TABLE "_BankCardToUser";

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
