// @ts-nocheck
import { BoardItem, UserState, userActions } from "../redux/userSlice";
import { getBackgroundStyle, trimString } from "../utils";
import StarSvg from '../assets/star.svg';
import { trpc } from "../trpc";
import { useAppDispatch } from "../hooks";
import { Link } from "wouter";

export default function BoardPreview(board: BoardItem) {

    const dispatch = useAppDispatch()

    async function handleToggleStar(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        const id = board.id;
        await trpc.board.toggleStar.mutate({ id });
        const boards = await trpc.user.getBoards.query();
        dispatch(userActions.setUser({
            boards
        } as UserState))
    }

    const bg = getBackgroundStyle(board);

    return (
        <Link to={`/board/${board.id}`}>
            <div style={bg} className={`h-[100px] w-[200px] bg-center bg-cover bg-no-repeat rounded 
            relative overflow-hidden`}>
                <div className="canvas bg-black/20 hover:bg-black/30 cursor-pointer boards__board-container">
                    <span className="text-white font-bold block mt-1 mx-2 drop-shadow-md">{trimString(board.name, 40)}</span>
                    <div
                    onClick={handleToggleStar} 
                    className={`cursor-pointer absolute bottom-2 right-2 ${!board.starred ? 'boards__board-star' : ''}`}>
                        <StarSvg className={`h-5 w-5 stroke-white hover:scale-110 hover:fill-none
                        ${board.starred ? 'stroke-yellow-400 fill-yellow-300' : 'hover:'}`} />
                    </div> 
                </div>
            </div>
        </Link>
    );
}