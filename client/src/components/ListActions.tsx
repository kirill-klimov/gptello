// @ts-nocheck
import { useState } from 'react';
import XSvg from '../assets/x.svg';
import ChevronLeftSvg from '../assets/chevron-left.svg';
import MyButton from './MyButton';
import { trpc } from '../trpc';
import { useAppDispatch } from '../hooks';
import { boardActions, fetchBoard } from '../redux/boardSlice';

type Props = { 
    close: Function 
    list_id: string 
    board_id: string
}

const pages = [
    { id: 1, title: 'List actions' },
    { id: 2, title: 'Delete all cards in this list?' },
    { id: 3, title: 'Delete this list?' },
];

export default function ListActions(props: Props) {

    const dispatch = useAppDispatch();
    const [page, setPage] = useState<typeof pages[0]>(pages[0]);

    async function handleClearList() {
        const res = await trpc.list.clear.mutate({ id: props.list_id });
        props.close();
        dispatch(fetchBoard(props.board_id));
    }

    async function handleDeleteList() {
        const res = await trpc.list.delete.mutate({ id: props.list_id });
        props.close();
        dispatch(fetchBoard(props.board_id));
    }

    return (
        <div className="absolute w-[275px] bg-white rounded py-2 shadow-md border select-none z-20">
            <div className="flex items-center justify-between border-b px-2 pb-2 mb-2">
                <div>
                {
                    page.id === 1 ? <></> :
                    <div 
                    onClick={_ => setPage(pages[0])}
                    className='p-1 -m-1 cursor-pointer'>
                        <ChevronLeftSvg className='h-4 w-4 stroke-text-500' />
                    </div>
                }
                </div>
                <span className="text-sm">{page.title}</span>
                <div className="shrink-0 min-w-max cursor-pointer" onClick={_ => props.close()}>
                    <XSvg className="h-4 w-4 stroke-text-500" />
                </div>
            </div>
            <div className="text-sm">
            {
                page.id === 1 ?
                <>
                <div
                onClick={_ => setPage(pages[1])} 
                className="cursor-pointer hover:bg-gray-200 px-3 py-2">
                    <span>Clear list</span>
                </div>
                <div 
                onClick={_ => setPage(pages[2])}
                className="cursor-pointer hover:bg-gray-200 px-3 py-2">
                    <span>Delete list</span>
                </div>
                </>
                : page.id === 2 ?
                <div className='px-3 py-1'>
                    <span className='block mb-3'>This action will remove all cards in this list. All data will be lost.</span>
                    <MyButton
                    className='w-full bg-red-600 hover:bg-red-700 active:bg-red-500 ring-red-600/50'
                    onClick={handleClearList} 
                    style='subtle'
                    text="Delete all" />
                </div>
                : page.id === 3 ? 
                <div className='px-3 py-1'>
                    <span className='block mb-3'>This action will delete this list. All data will be lost.</span>
                    <MyButton
                    className='w-full bg-red-600 hover:bg-red-700 active:bg-red-500 ring-red-600/50'
                    onClick={handleDeleteList} 
                    style='subtle'
                    text="Delete list" />
                </div> 
                : <></>
            }
            </div>
        </div>
    );
}