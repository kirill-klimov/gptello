// @ts-nocheck
import { useEffect } from "react";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../hooks";
import { UserState, userActions } from "../redux/userSlice";
import { trpc } from "../trpc";
import BoardPreview from "../components/BoardPreview";

import BoardSvg from '../assets/board.svg';
import TemplateSvg from '../assets/template.svg';
import PlusSvg from '../assets/plus.svg';
import StarSvg from '../assets/star.svg';
import ClockSvg from '../assets/clock.svg';
import { getStarredBoards, sortByName } from "../utils";
import { Popover } from "@headlessui/react";
import CreateBoard from "../components/CreateBoard";

export default function Boards() {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);
    const boards = sortByName(user.boards || []);
    const starred_boards = getStarredBoards(user.boards || []);
    const recent_boards = user.boards?.slice(0, 5);

    useEffect(() => { fetchProfile(); }, []);

    async function fetchProfile() {
        const profile = await trpc.user.getProfile.query();
        const boards = await trpc.user.getBoards.query();

        dispatch(userActions.setUser({
            ...profile,
            boards,
        } as UserState));
    }

    function placeCreatePopover() {
        const btn = document.getElementById("create-board") as HTMLDivElement;
        if (!btn) return null;
        const btnRect = btn.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const placement = { } as any;
        if (btnRect.top / windowHeight < 0.5) {
            placement.top = 0;
        } else {
            placement.bottom = 0;
        }
        return placement;
      }

    return (
        <div>
            <Header />
            <div className="flex justify-center py-10">
                <div className="max-w-5xl px-4 container flex">
                    <div className="w-full max-w-[200px] select-none mr-6">
                        <div className={`flex items-center hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer 
                        bg-primary-100 text-primary-600 hover:bg-primary-200 mb-2`}>
                            <BoardSvg className="h-5 w-5 fill-text-500 mr-2" />
                            <span className="font-bold">Boards</span>
                        </div>
                        <div className="flex items-center hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer">
                            <TemplateSvg className="h-5 w-5 fill-text-500 mr-2" />
                            <span className="font-bold">Templates</span>
                        </div>
                    </div>
                    <div>
                        {!starred_boards?.length ? <></> :
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <StarSvg className="h-6 w-6 stroke-text-500 mr-2 stroke-2" /> 
                                <span className="text-lg font-medium tracking-wide">Starred</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                            {
                                !starred_boards?.length ? <></> :
                                starred_boards?.map(board => <BoardPreview key={board.id} {...board} />)
                            }
                            </div>
                        </div>}
                        {!recent_boards?.length ? <></> :
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <ClockSvg className="h-6 w-6 stroke-text-500 mr-2" /> 
                                <span className="text-lg font-medium tracking-wide">Recently viewed</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                            {
                                !recent_boards?.length ? <></> :
                                recent_boards?.map(board => <BoardPreview key={board.id} {...board} />)
                            }
                            </div>
                        </div>}

                        <div className="mb-6">
                            <span className="text-lg font-medium tracking-wide block mb-4">YOUR BOARDS</span>
                            <div className="flex gap-2 flex-wrap">
                            {
                                !boards?.length ? <></> :
                                boards?.map(board => <BoardPreview key={board.id} {...board} />)
                            }
                                <Popover>
                                {({ close }) => <div className="relative">
                                    <Popover.Button>
                                    <div id="create-board" className={`h-[100px] w-[200px] bg-neutral-300 rounded grid place-content-center 
                                    hover:bg-neutral-500/40 cursor-pointer`}>
                                        <div className="flex flex-col items-center">
                                            <PlusSvg className="h-6 w-6 stroke-neutral-500 mb-1" />
                                            <span className="text-sm text-neutral-500">Create new board</span>
                                        </div>
                                    </div>
                                    </Popover.Button>
                                    <Popover.Panel>
                                        <div 
                                        style={placeCreatePopover()}
                                        className={`absolute bg-white border left-[50%] -translate-x-[50%] shadow rounded w-[275px]`}>
                                            <CreateBoard close={close} />
                                        </div>
                                    </Popover.Panel>
                                </div>}
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}