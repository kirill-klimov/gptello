// @ts-nocheck

import { Fragment, useState } from 'react';
import PlusSvg from '../assets/plus.svg';
import XSvg from '../assets/x.svg';
import MyButton from './MyButton';
import { Popover } from '@headlessui/react';
import { trpc } from '../trpc';
import { useAppDispatch, useAppSelector } from '../hooks';
import { BoardState, boardActions, fetchBoard } from '../redux/boardSlice';

export default function AddListButton() {

    const [name, setName] = useState<string>('');

    const board = useAppSelector(state => state.board);
    const dispatch = useAppDispatch();

    async function handleSubmit(close: Function) {
        if (!name.trim().length) return;
        setName('');
        close();
        const order = board.lists?.length ? board.lists?.length + 1 : 1;
        const list = await trpc.list.create.mutate({
            board_id: board.id,
            name: name.trim(),
            order,
        });
        dispatch(fetchBoard(board.id));
    }

    return (
        <Popover as={Fragment}>
        {({ open, close }) =>
            <div className={`bg-gray-400/50 hover:bg-gray-500/50 active:bg-gray-400/75 shrink-0 w-[275px] rounded-xl 
            transition-colors
            ${open ? '!bg-gray-100/100' : ''}
            relative select-none`}>
                <Popover.Button>
                    <div className={`flex grow items-center pr-10 cursor-pointer ${open ? 'hidden p-0' : 'flex p-3'}`}>
                        <PlusSvg className='shrink-0 h-6 w-6 stroke-gray-200 mr-1' /> 
                        <span className='text-gray-100 text-sm'>Add another list</span>
                    </div>
                </Popover.Button>
                <Popover.Panel>
                    <div className={`text-sm rounded-xl -mt-5 ${open ? 'opacity-100 h-max p-2' : 'opacity-0 h-0 p-0'}`}>
                        <input
                        value={name}
                        autoFocus={true}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit(close)}
                        onChange={e => setName(e.target.value)}
                        className='bg-transparent font-medium w-full outline-none mb-2 px-2 py-1 focus:ring-1 rounded-md ring-primary-500/50'
                        type="text" 
                        placeholder='List name' />
                        <div className='flex items-center'>
                            <MyButton
                            style='subtle'
                            className='mr-2'
                            onClick={() => handleSubmit(close)}
                            text='Add list' />
                            <div className='cursor-pointer' onClick={_ => {close(); setName('');}}>
                                <XSvg className='h-6 w-6 stroke-neutral-800' />
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </div>}
        </Popover>
    );
}