// @ts-nocheck

import Star from "../Star";
import { BoardItem, UserState, userActions } from "../../redux/userSlice";
import { getBackgroundStyle, trimString } from "../../utils";
import { trpc } from "../../trpc";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link, useLocation } from "wouter";
import { boardActions } from "../../redux/boardSlice";

interface Props extends BoardItem {
    close: () => void
}

export default function BoardDropdownItem(props: Props) {

    const bg = getBackgroundStyle(props);
    const dispatch = useAppDispatch();
    const current_board_id = useAppSelector(state => state.board.id);
    const isStarred = useAppSelector(state => state.board.starred);

    async function handleToggleStar(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        const id = props.id;
        await trpc.board.toggleStar.mutate({ id });
        const boards = await trpc.user.getBoards.query();
        dispatch(userActions.setUser({ boards } as UserState));
        if (current_board_id === id) {
            dispatch(boardActions.setStarred(!isStarred));
        }
    }

    const [location, navigate] = useLocation();

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        props.close();
        navigate(`/board/${props.id}`, { replace: true });
    }

    return (
        <Link onClick={handleClick} to={`/`}>
            <div 
            className="select-none flex my-1 hover:bg-gray-100 max-w-sm cursor-pointer rounded p-1 pr-2 board-dropdown-item min-w-[250px]">
                <div 
                className="h-9 w-12 bg-cover bg-center bg-no-repeat rounded mr-2 shrink-0"
                style={bg}></div>
                <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm mr-2">{trimString(props.name, 30)}</span>
                    <div
                    onClick={handleToggleStar} 
                    className={`star-container ${props.starred ? '' : 'opacity-0'}`}>
                        <Star starred={props.starred} onToggle={() => {}} />
                    </div>
                </div>
            </div>
        </Link>
    );
}