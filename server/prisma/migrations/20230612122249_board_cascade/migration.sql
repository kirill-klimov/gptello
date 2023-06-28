-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_board_id_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
