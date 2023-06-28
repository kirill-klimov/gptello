// @ts-nocheck
import Header from "../components/Header";
import StarSvg from '../assets/star.svg';
import SparklesSvg from '../assets/sparkles.svg';
import LockSvg from '../assets/lock.svg';
import XSvg from '../assets/x.svg';
import { Fragment, useEffect, useRef, useState } from "react";
import { trpc } from "../trpc";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getBackgroundStyle, isAllowedToView } from "../utils";
import { boardActions, fetchBoard } from "../redux/boardSlice";
import ListView from "../components/ListView";
import AddListButton from "../components/AddListButton";
import ContentEditable from "react-contenteditable";
import { useRoute } from "wouter";
import CardView from "../components/CardView";
import { Popover } from "@headlessui/react";
import MyButton from "../components/MyButton";
import toastMe from "../components/MyToaster";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardVisibility from "../components/BoardVisibility";
import FilterButton from "../components/FilterButton";
import ShareButton from "../components/ShareButton";
import BoardMenu from "../components/BoardMenu";
import BoardUserItem from "../components/BoardUserItem";

type Props = { params: { id: string } };

export default function BoardView(props: Props) {

    const [cardMatch, cardParams] = useRoute('/board/:board_id/card/:card_id');
    const id = props.params.id || cardParams?.board_id || '';
    const dispatch = useAppDispatch();
    const board = useAppSelector(state => state.board);
    const loading = useAppSelector(state => state.board.loading);
    const closed_at = useAppSelector(state => state.board.closed_at);
    const user = useAppSelector(state => state.user);
    const name = useRef<string>('');
    const [generatingBoard, setGeneratingBoard] = useState<boolean>(false);


    useEffect(() => { 
        dispatch(fetchBoard(id));
        name.current = '';
     }, [id]);

    async function toggleStar() {
        if (!board.id) return;
        await trpc.board.toggleStar.mutate({ id });
        dispatch(fetchBoard(id));
    }

    async function handleSubmit(e: React.KeyboardEvent | React.FocusEvent) {
        e.preventDefault();
        if (name.current === board.name) return;
        const div = e.target as HTMLDivElement;
        if (name.current === '') {
            name.current = board.name;
            div.blur();
            div.textContent = board.name;
        } else {
            await trpc.board.update.mutate({ id, name: name.current.trim() });
            div.blur();
            dispatch(fetchBoard(id));
        }
    }

    async function generateBoard(close: Function) {
        try {
            setGeneratingBoard(true);
            await trpc.board.generateBoard.mutate({ id });
            dispatch(fetchBoard(id));
            close();
            setGeneratingBoard(false);
        } catch(e) {
            console.log(e);
            toastMe('There was an error', { position: 'bottom-left' });
            setGeneratingBoard(false);
        }
    }

    async function handleDragEnd(e: DropResult) {
        setDraggingElements(false);
        setDraggingBoard(false);
        if (!e.destination) return;
        if (e.type === 'LIST') {
            const arr = Array.from(board.lists || []);
            const lists = arr
            .sort((a, b) => a.order - b.order)
            .map((l, i) => ({...l, order: i + 1}))
            .filter(l => l.id !== e.draggableId);
            const dragged_list = arr.find(l => l.id === e.draggableId);
            // @ts-ignore
            lists.splice(e.destination.index, 0, dragged_list);
            const reordered = lists.map((list, index) => ({
                ...list,
                order: index + 1,
            }));
            dispatch(boardActions.setLists(reordered));

            await Promise.all(reordered.map(async list => {
                return await trpc.list.update.mutate({
                    id: list.id,
                    order: list.order,
                }); 
            }));
        }
        if (e.type === 'CARD') {
            if (e.source.droppableId === e.destination.droppableId) {
                const arr = Array.from(board.lists.find(l => l.id === e.source.droppableId)?.cards || []);
                const cards = arr
                .sort((a, b) => a.order - b.order)
                .filter(c => c.id !== e.draggableId);
                const dragged_card = arr.find(c => c.id === e.draggableId);
                // @ts-ignore
                cards.splice(e.destination.index, 0, dragged_card);
                const reordered = cards.map((card, index) => ({
                    ...card,
                    order: index + 1,
                }));
                const lists = board.lists.map(l => {
                    if (l.id === e.source.droppableId) {
                        return {...l, cards: reordered};
                    } else {
                        return {...l};
                    }
                })
                dispatch(boardActions.setLists(lists));
                await Promise.all(reordered.map(async card => {
                    return await trpc.card.update.mutate({
                        id: card.id,
                        order: card.order,
                    });
                }));
            } else {
                const source_arr = Array.from(board.lists.find(l => l.id === e.source.droppableId)?.cards || []);
                const destination_arr = Array.from(board.lists.find(l => l.id === e.destination?.droppableId)?.cards || []);
                const source_cards = source_arr
                .sort((a, b) => a.order - b.order)
                .filter(c => c.id !== e.draggableId)
                .map((c, i) => ({...c, order: i + 1}));

                const destination_cards = destination_arr
                .sort((a, b) => a.order - b.order)
                .filter(c => c.id !== e.draggableId);

                const dragged_card = source_arr.find(c => c.id === e.draggableId);
                // @ts-ignore
                destination_cards.splice(e.destination.index, 0, dragged_card);
                const reordered_destination = destination_cards.map((c, i) => ({...c, order: i + 1}));
                const lists = Array.from(board.lists).map(list => {
                    // @ts-ignore
                    if (list.id === e.source.droppableId) {
                        return { ...list, cards: source_cards };
                    }
                    // @ts-ignore
                    if (list.id === e.destination.droppableId) {
                        return { ...list, cards: reordered_destination };
                    }
                    return {...list};
                });
                dispatch(boardActions.setLists(lists));
                await Promise.all(reordered_destination.map(async card => {
                    return await trpc.card.update.mutate({
                        id: card.id,
                        order: card.order,
                        // @ts-ignore
                        list_id: e.destination.droppableId,
                    });
                }));
                await Promise.all(source_cards.map(async card => {
                    return await trpc.card.update.mutate({
                        id: card.id,
                        order: card.order,
                    });
                }));
            }
        }
        dispatch(fetchBoard(id));
    } 

    const [isDraggingElements, setDraggingElements] = useState<boolean>(false);
    const [isDraggingBoard, setDraggingBoard] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startScrollLeft, setStartScrollLeft] = useState<number>(0);
    function handleBoardDragStart(e: React.MouseEvent) {
        if (isDraggingElements) return;
        setDraggingBoard(true);
        setStartX(e.clientX);
        setStartScrollLeft((e.target as HTMLDivElement).scrollLeft);
    }
    function handleBoardDragEnd(e: React.MouseEvent) {
        if (isDraggingElements) return;
        setDraggingBoard(false);
    }
    function handleBoardDrag(e: React.MouseEvent) {
        if (!isDraggingBoard || isDraggingElements) return;
        const div = e.target as HTMLDivElement;
        const deltaX = e.clientX - startX;
        div.scrollLeft = startScrollLeft - deltaX;
    }

    return (
        <div className="canvas flex flex-col">
            <Header />
            {loading ?
            <div className="canvas grid place-items-center bg-gray-100 opacity-0 fade-in-long">
                <div className="h-10 w-10 border-4 border-primary-500 rounded-full border-l-transparent animate-spin"></div>
            </div> 
            : !isAllowedToView(user, board) ?
            <div className="canvas grid place-items-center">
                <div className="flex flex-col items-center bg-white rounded w-full max-w-md py-16 shadow">
                    <LockSvg className="w-10 h-10 mb-4" />
                    <span className="font-medium text-lg">This board is private</span>
                </div>
            </div>
            : closed_at ?
            <div
            className="canvas bg-center bg-no-repeat bg-cover grid place-items-center"
            style={getBackgroundStyle(board)}>
                <div className="bg-white rounded shadow w-full max-w-md flex justify-center py-10">
                    <span className="text-lg font-medium">{board.name} is closed.</span>
                </div>
            </div>
            :
            <div 
            style={getBackgroundStyle(board)} 
            className="relative grow bg-center bg-no-repeat bg-cover pb-3">
                <div className="flex justify-between h-12 absolute z-50 top-0 w-full px-4 bg-gray-900/25 backdrop-blur-sm">
                    <div className="flex items-center">
                        <ContentEditable 
                        spellCheck={false}
                        className={`font-bold text-white text-xl mr-2 drop-shadow-md px-1 -ml-1
                        outline-none focus:ring-4 ring-primary-500/50 rounded focus:bg-white focus:text-text-700`}
                        onChange={e => name.current = e.target.value}
                        id="ce-5"
                        onPaste={async (e) => {
                            e.preventDefault();
                            const text = e.clipboardData.getData('text/plain');
                            const div = document.getElementById('ce-5');
                            if (div) div.textContent += text;
                        }}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                        onBlur={e => handleSubmit(e)}
                        html={board.name} />

                        <div onClick={toggleStar} className="cursor-pointer mr-4">
                            <StarSvg className={`h-5 w-5 hover:scale-110 active:scale-100
                            ${board?.starred ? 
                            'stroke-yellow-300 fill-yellow-300' : 'stroke-white hover:stroke-yellow-300'}`} />
                        </div>

                        <BoardVisibility className="mr-6 ml-3" />

                        <Popover as={Fragment}>
                        {({ open, close }) =>
                        <div id="sparkles" className="relative">
                            <Popover.Button>
                                <div className={`rounded-md cursor-pointer hover:bg-gray-400/50 p-[6px] -m-[6px] -mb-[10px] ${open?'bg-gray-400/50':''}`}>
                                    <SparklesSvg className="h-5 w-5 stroke-purple-200" />
                                </div>
                            </Popover.Button>
                            <Popover.Panel>
                                <div className="text-sm absolute z-[100] bg-white rounded-md shadow border p-3 top-8 left-0 w-[275px]">
                                    <div className="border-b flex items-center justify-between pb-2 mb-2">
                                        <div />
                                        <span className="text-sm text-gray-500">Generate with AI</span>
                                        <div 
                                        onClick={_ => close()}
                                        className="rounded-full hover:bg-gray-200 p-1 -m-1 cursor-pointer">
                                            <XSvg className="h-5 w-5 stroke-text-500" />
                                        </div>
                                    </div>
                                    <p className="text-sm w-full mb-2">You can generate cards and lists for this board based on it's name.</p>
                                    <p className="text-sm w-full mb-3 font-medium">Existing lists and cards will be replaced with generated.</p>
                                    <MyButton
                                    style="subtle"
                                    className="w-full"
                                    loading={generatingBoard}
                                    onClick={_ => generateBoard(close)}
                                    text='Generate' />
                                    {generatingBoard && <div className="mt-2 w-full h-1 bg-gray-200 rounded">
                                        <div className="w-0 h-1 bg-primary-400 rounded animate-generating-board"></div>
                                    </div>}
                                </div>
                            </Popover.Panel>
                        </div>}
                        </Popover>
                    </div>
                    <div className="flex items-center relative">
                        <FilterButton className="mr-6" />
                        <div className="mr-4">
                            {!board.users_on_boards?.length ? <></> : board.users_on_boards?.map((u, i) => (
                                <BoardUserItem key={i} {...u} />
                            ))}
                        </div>
                        <ShareButton className="mr-6" />
                        <BoardMenu />
                    </div>
                </div>
                <DragDropContext
                onDragStart={_ => setDraggingElements(true)}
                onDragEnd={handleDragEnd}>
                    <Droppable droppableId="all-lists" direction="horizontal" type='LIST'>
                        {(boardDroppable) => (
                        <div 
                        {...boardDroppable.droppableProps} 
                        ref={boardDroppable.innerRef} 
                        onMouseMove={handleBoardDrag}
                        onMouseDown={handleBoardDragStart}
                        onMouseUp={handleBoardDragEnd}
                        className={`h-full px-4 pt-16 flex items-start overflow-x-scroll list-view-container select-none`}>
                            {Array.from(board.lists || []).sort((a, b) => a.order - b.order).map((list, listIndex) => (
                                <ListView key={list.id} {...list} index={listIndex}  />
                            ))}
                            {boardDroppable.placeholder}
                            <AddListButton />
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>}
            { cardMatch && <CardView params={cardParams} /> }
        </div>
    );
}