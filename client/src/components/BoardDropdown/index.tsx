// @ts-nocheck
import { Popover, Transition } from '@headlessui/react';
import Chevron from '../../assets/chevron-down.svg';
import BoardDropdownItem from './BoardDropdownItem';
import { Fragment, ReactNode, useEffect } from 'react';
import { TransitionProps, getStarredBoards } from '../../utils';

import { BoardItem, UserState, userActions } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { trpc } from '../../trpc';

type Props = {
    name: "Recent" | "Starred" | "Templates"
    className?: string
}

function Wrapper(props: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            const boards = await trpc.user.getBoards.query();
            dispatch(userActions.setUser({ boards } as UserState));
        })();
    }, []);
    return <>{props.children}</>
}

export default function BoardDropdown(props: Props) {

    const user_boards = useAppSelector(state => state.user.boards);
    const data: { boards: BoardItem[] } = {
        boards: []
    }
    switch(props.name) {
        case "Recent":
            data.boards = user_boards?.slice(0, 5) || [];
            break;
        case "Starred":
            data.boards = getStarredBoards(user_boards || [])
            break;
        default: break;
    }

    return (
        <Popover>
        {
            ({ open, close }) =>
            <div className={`relative outline-none ${props.className}`}>
                <Popover.Button>
                    <div className={`flex items-center hover:bg-gray-300 px-3 py-[6px] rounded cursor-pointer outline-none
                    ${open ? 'bg-primary-50 text-primary-600 hover:bg-primary-100' : ''}`}>
                        <span className='block mr-1 text-sm'>{props.name}</span>
                        <Chevron className={`${open ? 'path-fill-primary-600' : ''}`} />
                    </div>
                </Popover.Button>
                <Transition
                as={Fragment}
                {...TransitionProps}>
                    <Popover.Panel>
                        <Wrapper>
                        <div className='bg-white absolute rounded shadow-md p-2 px-3 min-w-max'>
                        {data.boards?.length ? data.boards?.map(item => 
                            <BoardDropdownItem
                            close={close} 
                            key={item.id} 
                            {...item} />) 
                        : 
                        <div className='min-w-[200px] text-center py-4'>
                            <span className='text-sm'>No boards</span>
                        </div>
                        }
                        </div>
                        </Wrapper>
                    </Popover.Panel>
                </Transition>
            </div>
        }
        </Popover>
    );
}