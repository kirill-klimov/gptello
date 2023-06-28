-- DropForeignKey
ALTER TABLE "UsersOnBoards" DROP CONSTRAINT "UsersOnBoards_board_id_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
