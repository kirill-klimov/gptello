import { z } from "zod";
import { BoardItem, UserState } from "./redux/userSlice";
import { BackgroundType } from "./components/BackgroundSelector";
import { BoardState } from "./redux/boardSlice";
import { Visibility } from "./components/VisibilitySelector";

export function parseZodError(err: z.ZodError<string>) {
    return JSON.parse(err.message) as Array<{ message: string }>;
}

export function getErrorMessage(err: string) {
    try {
        const arr = JSON.parse(err) as Array<{ message: string }>;
        return arr.at(0)?.message || '';
    } catch(e) {
        return err || '';
    }
}

export const TransitionProps = {
    enter: "transition ease-out duration-100",
    leave: "transition ease-in duration-100",
    enterFrom: "opacity-0 translate-y-3",
    enterTo: "opacity-100 translate-y-2",
    leaveFrom: "opacity-100 translate-y-2",
    leaveTo: "opacity-0 translate-y-3",
}

export function getBackgroundStyle(board: BoardState | BoardItem) {
    const bgType = board.background_type === BackgroundType.Color ? 'backgroundColor' : 'backgroundImage';
    const bg = { [bgType]: board.background_value };
    return bg;
}

export function trimString(str: string, len: number) {
    if (str.length < len) return str;
    return str.slice(0, len).trim() + '...';
}

export function sortByName(boards: BoardItem[]) {
    const arr = [...boards];
    return arr.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
}

export function getStarredBoards(boards: BoardItem[]) {
    const arr = [...boards];
    return [...sortByName(arr?.filter(b => b.starred) || [])];
}

export function formatDate(timestamp: string) {
    if (!timestamp.length) return '';
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

export function isAllowedToView(user: UserState, board: BoardState) {
    if (board.visibility === Visibility.Public) return true;
    const u = Array.from(board.users_on_boards || []).find(i => i.user.id === user.id);
    if (!u) return false;
    return true; 
}