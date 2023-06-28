// @ts-nocheck
import BarsSvg from '../assets/bars.svg';
import { Card, fetchBoard } from "../redux/boardSlice";
import PenSvg from '../assets/pen.svg';
import { Popover } from "@headlessui/react";
import MyButton from "./MyButton";
import EditableDiv from "./EditableDiv";
import { Fragment, useEffect, useRef, useState } from "react";
import { trpc } from "../trpc";
import { useAppDispatch } from "../hooks";
import { Link } from "wouter";
import { createPortal } from "react-dom";
import React from 'react';
import { Draggable } from "react-beautiful-dnd";

interface Props extends Card {
    board_id: string
    index: number
};

type WrapperArgs = { 
    left: number, 
    top: number, 
    width: number,
    height: number,
};

interface WrapperProps {
    children: (args: WrapperArgs) => React.ReactNode
    card_id: string
}

function Wrapper({ children, card_id }: WrapperProps) {
    const [args, setArgs] = useState<WrapperArgs>({ left: 0, top: 0, width: 0, height: 0 });
    useEffect(() => {
        const card = document.getElementById(card_id);
        const rect = card?.getBoundingClientRect();
        if (rect) {
            setArgs({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
            });
        };
    }, []);    
    return (
        args.width ? <>{children({ ...args })}</> : <></>
    );
}

export default function CardItemView(card: Props) {

    const divRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState<string>(card.name);
    const dispatch = useAppDispatch();

    async function handleSubmit(close: Function) {
        const res = await trpc.card.update.mutate({ 
            id: card.id,
            name: name.trim()
        });
        dispatch(fetchBoard(card.board_id));
        close();
    }

    return (
        <Draggable draggableId={card.id} index={card.index} key={card.id}>
        {(cardDraggable, snapshot) => (
            <div
            {...cardDraggable.draggableProps}
            {...cardDraggable.dragHandleProps}
            ref={cardDraggable.innerRef}
            className={`${snapshot.isDragging ? '' : ''}`}>
                <Popover as={Fragment}>
                {({ close, open }) => 
                <Link to={`/board/${card.board_id}/card/${card.id}`}>
                    <div>
                        <div
                        id={card.id} 
                        className={`text-sm bg-white rounded-lg py-2 px-3 shadow border mb-2 
                        hover:bg-neutral-100 cursor-pointer relative card-item`}>
                            <div>
                                <span>{card.name}</span>
                                <Popover.Button>
                                    <div className="absolute right-1 top-1 p-2 z-10 hover:bg-neutral-200 backdrop-blur cursor-pointer rounded opacity-0 card-edit-icon">
                                        <PenSvg className="w-3 h-3 stroke-neutral-500 stroke-2" />
                                    </div>
                                </Popover.Button>
                            </div>
                            {/* <div>
                                {card.content !== null ? <BarsSvg className='h-4 w-4 stroke-text-500 mt-1' /> : <></>}
                            </div> */}
                        </div>
                        <Popover.Overlay 
                        id="card-edit-overlay"
                        onClick={e => e.stopPropagation()}
                        className="fixed inset-0 bg-black/50 z-[51] fade-in" />
                        {createPortal(
                            <Wrapper card_id={card.id}>
                            {(wrapperArgs) => 
                                <Popover.Panel>
                                        <div 
                                        onClick={e => e.stopPropagation()}
                                        style={{...wrapperArgs}}
                                        className="absolute z-[52] w-full">
                                            <EditableDiv 
                                            autoFocus={true}
                                            divRef={divRef}
                                            text={card.name}
                                            onChange={value => setName(value)}
                                            onSubmit={_ => handleSubmit(close)}
                                            className={`bg-white text-sm rounded-md py-2 
                                            outline-none px-3 mb-3`} />
                                            <MyButton 
                                            onClick={_ => handleSubmit(close)}
                                            style="subtle" 
                                            className="px-6 z-[52]"
                                            text="Save" />
                                        </div>
                                    </Popover.Panel>}
                            </Wrapper>, 
                            document.getElementById('card-edit-overlay') || document.body
                        )}
                    </div>
                </Link>}
                </Popover>
            </div>
            )}
        </Draggable>
    );
}