-- DropForeignKey
ALTER TABLE "LastAccessedBoardByUser" DROP CONSTRAINT "LastAccessedBoardByUser_board_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnBoards" DROP CONSTRAINT "UsersOnBoards_user_id_fkey";

-- AddForeignKey
ALTER TABLE "LastAccessedBoardByUser" ADD CONSTRAINT "LastAccessedBoardByUser_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
