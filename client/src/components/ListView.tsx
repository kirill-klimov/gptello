// @ts-nocheck
import { List, fetchBoard } from "../redux/boardSlice";
import AddCardButton from "./AddCardButton";
import CardItemView from "./CardItemView";
import EllipsisSvg from '../assets/ellipsis.svg';
import { Popover } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import ListActions from "./ListActions";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { trpc } from "../trpc";
import { useAppDispatch } from "../hooks";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props extends List {
    index: number
} 

export default function ListView(list: Props) {

    const name = useRef<string>('');

    const dispatch = useAppDispatch();

    function handleChange(e: ContentEditableEvent) {
        name.current = e.target.value;
    }

    async function handleSubmit(e: React.KeyboardEvent | React.FocusEvent) {
        if (name.current === '') {
            (e.target as HTMLDivElement).blur();
            name.current = list.name;
            (e.target as HTMLDivElement).textContent = list.name;
        } else {
            const res = await trpc.list.update.mutate({
                id: list.id,
                name: name.current.trim(),
            });
            (e.target as HTMLDivElement).blur();
            dispatch(fetchBoard(list.board_id));
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);   
        }
    }

    return (
        <Draggable draggableId={list.id} index={list.index} key={list.id}>
            {(listDraggable) => (
            <div
            {...listDraggable.draggableProps} 
            {...listDraggable.dragHandleProps} 
            ref={listDraggable.innerRef} 
            className="bg-gray-100 rounded-lg px-[10px] py-3 pt-4 w-[275px] shrink-0 mr-3 shadow-md list-view-grid">
                <div className="px-2 flex items-center justify-between">
                    <ContentEditable
                    spellCheck={false}
                    className="text-sm font-medium w-full px-2 py-1 -mx-2 -my-1 outline-none focus:bg-white rounded focus:ring-2 ring-primary-500"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSubmit}
                    id="ce-4"
                    onPaste={async (e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        const div = document.getElementById('ce-4');
                        if (div) div.textContent += text;
                    }}
                    html={list.name} />
                    <Popover as={Fragment}>
                    {({ close }) =>
                        <div className="relative">
                            <Popover.Button>
                                <div className="rounded hover:bg-gray-300 cursor-pointer p-1 -m-1 mt-0 ml-3">
                                    <EllipsisSvg className="h-5 w-5 stroke-text-500" />
                                </div>
                            </Popover.Button>
                            <Popover.Panel>
                                <ListActions 
                                close={close} 
                                board_id={list.board_id}
                                list_id={list.id} />
                            </Popover.Panel>
                        </div>}
                    </Popover>
                </div>
                <Droppable droppableId={list.id} type='CARD'>
                {(listDroppable) => (
                    <div 
                    {...listDroppable.droppableProps} 
                    ref={listDroppable.innerRef}
                    className="mt-3 overflow-y-auto max-h-[55vh] card-scroll pr-[6px]">
                    {Array.from(list.cards || []).sort((a, b) => a.order - b.order).map((card, index) => 
                        <CardItemView 
                        key={card.id} 
                        index={index} 
                        board_id={list.board_id} 
                        {...card} />)}
                    {listDroppable.placeholder}
                    </div>
                )}
                </Droppable>
                <AddCardButton {...list} />
            </div>
            )}
        </Draggable>
    );
}