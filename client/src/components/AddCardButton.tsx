// @ts-nocheck

import { Popover } from '@headlessui/react';
import PlusSvg from '../assets/plus.svg';
import React, { Fragment, useRef, useState } from 'react';
import XSvg from '../assets/x.svg';
import MyButton from './MyButton';
import { trpc } from '../trpc';
import { useAppDispatch } from '../hooks';
import { List, fetchBoard } from '../redux/boardSlice';

export default function AddCardButton(list: List) {

    const divRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('');

    function handleClick() {
        setName('');
        setTimeout(() => {
            divRef.current && divRef.current.focus();
        }, 50);
    }

    function handleChange(e: React.FormEvent<HTMLDivElement>) {
        setName((e.target as HTMLDivElement).textContent || '');
    }

    async function handleSubmit(close: Function, e?: React.KeyboardEvent) {
        e?.key === 'Enter' && e.preventDefault();
        if (name.trim().length && (e ? e.key === 'Enter' : true)) {
            setName('');
            if (divRef.current) divRef.current.textContent = '';
            const card = await trpc.card.create.mutate({
                name: name.trim(),
                list_id: list.id,
                order: list.cards.length + 1,
            });
            dispatch(fetchBoard(list.board_id));
        };
    }

    return (
        <Popover as={Fragment}>
        {({ open, close }) =>
        <div className='flex flex-col'>
            <Popover.Button onClick={handleClick}>
                <div className={`items-center rounded-md hover:bg-gray-300 cursor-pointer py-[6px] px-2 
                ${open ? 'hidden' : 'flex'} select-none`}>
                    <PlusSvg className='h-5 w-5 stroke-text-600 mr-1' />
                    <span className='text-sm'>Add a card</span>
                </div>
            </Popover.Button>
            <Popover.Panel>
                <div className={`${open ? 'opacity-100' : 'opacity-0 h-0'}`}>
                    <div className='relative mb-2'>
                        <div
                        ref={divRef}
                        onInput={handleChange}
                        onKeyDown={e => handleSubmit(close, e)}
                        contentEditable={true}
                        id='ce-2'
                        onPaste={async (e) => {
                            e.preventDefault();
                            const text = e.clipboardData.getData('text/plain');
                            const div = document.getElementById('ce-2');
                            if (div) div.textContent += text;
                        }}
                        autoFocus={true}
                        className='w-full outline-none rounded-md shadow px-3 py-2 text-sm bg-white min-h-[75px]'>
                        </div>
                        <span className={`absolute text-sm text-gray-500 top-2 left-3 
                        ${name.length ? 'opacity-0' : ''} pointer-events-none`}>Enter title for this card</span>
                    </div>
                    <div className='flex items-center'>
                        <MyButton
                        style='subtle'
                        className='mr-2'
                        onClick={_ => handleSubmit(close)}
                        text='Add card' />
                        <div className='cursor-pointer'>
                            <XSvg className='h-6 w-6 stroke-neutral-800' onClick={_ => { close(); setName(''); }} />
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </div>}
        </Popover>
    );
}