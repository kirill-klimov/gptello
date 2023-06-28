// @ts-nocheck
import { Popover } from "@headlessui/react";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Visibility } from "./VisibilitySelector";
import GlobeSvg from '../assets/globe.svg';
import LockSvg from '../assets/lock.svg';
import CheckSvg from '../assets/checkmark.svg';
// @ts-nocheck
import PopoverHeader from "./PopoverHeader";
import { trpc } from "../trpc";
import { fetchBoard } from "../redux/boardSlice";


type Props = { className?: string }

export default function BoardVisibility(props: Props) {

    const board = useAppSelector(state => state.board);
    const dispatch = useAppDispatch();

    async function handleSubmit(type: Visibility, close: Function) {
        await trpc.board.update.mutate({
            id: board.id,
            visibility: type
        });
        dispatch(fetchBoard(board.id));
        close();
    }

    return (
        <Popover as={Fragment}>
        {({open, close}) => (
            <div className={`relative -mb-2 ${props.className}`}>
                <Popover.Button>
                    <div className={`flex items-center py-2 -my-2 px-3 -mx-3 hover:bg-gray-500/50 rounded ${open?'bg-gray-500/50':''}`}>
                        <div className="mr-1">
                        {
                            board.visibility === Visibility.Private ?
                            <LockSvg className="h-5 w-5 stroke-gray-200 shrink-0" />
                            :
                            <GlobeSvg className="h-5 w-5 stroke-gray-200 shrink-0" />
                        }
                        </div>
                        <span className="text-sm text-gray-200">{board.visibility}</span>
                    </div>
                </Popover.Button>
                <Popover.Panel>
                    <div className="absolute top-10 left-0 bg-white shadow border rounded p-4 w-[300px]">
                        <PopoverHeader className="mb-4 -mt-1" text='Change visibility' close={close} />
                        <div className="hover:bg-gray-200 rounded p-2 -m-2 cursor-pointer select-none mb-1">
                            <div
                            onClick={_ => handleSubmit(Visibility.Private, close)}
                            className="text-sm flex items-center mb-1">
                                <LockSvg className="h-4 w-4 stroke-red-700 shrink-0 mr-1" />
                                <span className="block mr-1">Private</span>
                                { board.visibility === Visibility.Private && <CheckSvg className="h-4 w-4 stroke-text-500 shrink-0 mr-1" /> }
                            </div>
                            <p className="text-xs">Anyone on the internet can see this board. Only board members can edit.</p>
                        </div>
                        <div className="hover:bg-gray-200 rounded p-2 -m-2 cursor-pointer select-none">
                            <div
                            onClick={_ => handleSubmit(Visibility.Public, close)} 
                            className="text-sm flex items-center mb-1">
                                <GlobeSvg className="h-4 w-4 stroke-green-600 shrink-0 mr-1" />
                                <span className="block mr-1">Public</span>
                                { board.visibility === Visibility.Public && <CheckSvg className="h-4 w-4 stroke-text-500 shrink-0 mr-1" /> }
                            </div>
                            <p className="text-xs">Anyone on the internet can see this board. Only board members can edit.</p>
                        </div>
                    </div>
                </Popover.Panel>
            </div>
        )}
        </Popover>
    );
}