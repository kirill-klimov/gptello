/*
  Warnings:

  - Added the required column `background` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Dark', 'Light');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Invite', 'Info');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Read', 'Unread');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Authorized', 'Private');

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "background" TEXT NOT NULL,
ADD COLUMN     "closed_at" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'Private';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_url" TEXT NOT NULL,
ADD COLUMN     "preferred_theme" "Theme" NOT NULL DEFAULT 'Light';

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'Unread',
    "type" "NotificationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastAccessedBoardByUser" (
    "user_id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "last_accessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastAccessedBoardByUser_pkey" PRIMARY KEY ("user_id","board_id")
);

-- CreateTable
CREATE TABLE "_StarredBoards" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StarredBoards_AB_unique" ON "_StarredBoards"("A", "B");

-- CreateIndex
CREATE INDEX "_StarredBoards_B_index" ON "_StarredBoards"("B");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastAccessedBoardByUser" ADD CONSTRAINT "LastAccessedBoardByUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastAccessedBoardByUser" ADD CONSTRAINT "LastAccessedBoardByUser_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StarredBoards" ADD CONSTRAINT "_StarredBoards_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StarredBoards" ADD CONSTRAINT "_StarredBoards_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
