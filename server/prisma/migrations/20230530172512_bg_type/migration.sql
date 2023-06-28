/*
  Warnings:

  - Changed the type of `background_type` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BackgroundType" AS ENUM ('Color', 'Image');

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "background_type",
ADD COLUMN     "background_type" "BackgroundType" NOT NULL;
