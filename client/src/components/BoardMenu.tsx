// @ts-nocheck

import { Popover } from "@headlessui/react";
import { Fragment, startTransition, useEffect, useRef, useState } from "react";
import EllipsisSvg from '../assets/ellipsis.svg';
import PopoverHeader from "./PopoverHeader";
import UserSvg from '../assets/user.svg';
import BarsSvg from '../assets/bars.svg';
import { useAppDispatch, useAppSelector } from "../hooks";
import ContentEditable from "react-contenteditable";
import EditableDiv from "./EditableDiv";
import { trpc } from "../trpc";
import { fetchBoard } from "../redux/boardSlice";
import MyButton from "./MyButton";
import { useLocation } from "wouter";

export default function BoardMenu() {

    const API = import.meta.env.VITE_API_URL;
    const user = useAppSelector(state => state.user);
    const board = useAppSelector(state => state.board);
    const [description, setDescription] = useState<string>(board.description || '');
    const [isEditingDescription, setEditingDescription] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [_, navigate] = useLocation();

    async function handleSubmitDescription() {
        const value = description.trim();
        setEditingDescription(false);
        setDescription(value)
        if (divRef.current) {
            divRef.current.textContent = value;
            divRef.current.blur();
        }
        await trpc.board.update.mutate({
            id: board.id,
            description: value
        });
        dispatch(fetchBoard(board.id));
    }

    useEffect(() => {
        startTransition(() => {
            setEditingDescription(false)
            setDescription(board.description || '');
            if (divRef.current) divRef.current.textContent = board.description || '';
        });
    }, []);

    async function handleCloseBoard() {
        await trpc.board.update.mutate({ 
            id: board.id,
            // @ts-ignore
            closed_at: new Date() 
        });
        navigate('/boards');
    }

    return (
        <Popover as={Fragment}>
        {({ open, close }) => (
        <>
            <Popover.Button>
                <div className="p-1 rounded hover:bg-gray-400/50">
                    <EllipsisSvg className="h-6 w-6 stroke-gray-200 shrink-0" />
                </div>
            </Popover.Button>
            <Popover.Panel>
                <div className="absolute top-0 -right-4 w-[340px] menu-container">
                    <div className="p-2 bg-gray-50 border-l">
                        <PopoverHeader style="big" className="select-none" text='Menu' close={close} />
                        <div className="py-4 px-1">
                            <div className="flex items-center mb-4">
                                <UserSvg className="w-6 h-6 stroke-text-500 stroke-2 mr-2" />
                                <span className="font-medium">Board admin</span> 
                            </div>
                            <div className="flex items-center mb-6">
                                <div className="inline-block rounded-full overflow-hidden border-2 p-1 mr-2">
                                    <img 
                                    className="h-10 w-10 shrink-0"
                                    src={`${API}/resource/${user.avatar_name}`}  alt="pfp" />
                                </div>
                                <span className="font-medium text-lg -mt-1">{user.login}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <BarsSvg className="w-6 h-6 stroke-text-500 stroke-2 mr-2" />
                                <span className="font-medium">Description</span> 
                            </div>
                            <div className="relative">
                                <EditableDiv
                                autoFocus={false}
                                spellCheck={false}
                                divRef={divRef}
                                onSubmit={handleSubmitDescription}
                                onChange={value => setDescription(value)}
                                onBlur={handleSubmitDescription}
                                onFocus={() => setEditingDescription(true)}
                                className={`text-sm w-full min-h-[75px] outline-primary-500 px-3 py-2 focus:bg-white mr-8`}
                                text={description} />
                                {description.length || isEditingDescription ? <></> : 
                                <div
                                onClick={_ => divRef.current && divRef.current.focus()} 
                                className="absolute top-0 left-0 px-3 py-2 h-[75px] rounded bg-gray-200">
                                    <span className="text-sm text-gray-500 mb-2 block">Add a description to let people know what is this board is used for.</span>
                                </div>}
                            </div>
                            <div className="border-b mb-4"></div>
                            <Popover as={Fragment}>
                            {({ open, close }) => (
                                <div className="relative">
                                    <Popover.Button className="w-full text-left">
                                        <div className={`px-4 py-[5px] hover:bg-gray-200 rounded select-none cursor-pointer ${open?'bg-gray-200':''}`}>
                                            <span className="text-sm font-medium">Close board...</span>
                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel>
                                        <div className="popover">
                                            <PopoverHeader className="mb-3" text="Close board?" close={close} />
                                            <p className="text-sm mb-4">You can find and reopen closed boards at the bottom of your boards page.</p>
                                            <MyButton
                                            className="red-button w-full"
                                            style="subtle"
                                            onClick={handleCloseBoard}
                                            text="Close"/>
                                        </div>
                                    </Popover.Panel>
                                </div>
                            )}
                            </Popover>
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </>
        )}
        </Popover>
    );
}