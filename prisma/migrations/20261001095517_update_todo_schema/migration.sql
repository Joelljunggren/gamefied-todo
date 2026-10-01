/*
  Warnings:

  - You are about to drop the column `difficuly` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "difficuly",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;
