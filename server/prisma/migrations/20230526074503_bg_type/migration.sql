/*
  Warnings:

  - You are about to drop the column `background` on the `Board` table. All the data in the column will be lost.
  - Added the required column `background_type` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_value` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "background",
ADD COLUMN     "background_type" TEXT NOT NULL,
ADD COLUMN     "background_value" TEXT NOT NULL;
