import { Link, useLocation } from 'wouter';
import LogoText from '../assets/logo-text.svg';
import BoardDropdown from './BoardDropdown';
import { useAppDispatch, useAppSelector } from '../hooks';
import CreateBoardButton from './CreateBoardButton';

import BellSvg from '../assets/bell.svg';
import ThemeToggleSvg from '../assets/theme-toggle.svg';
import QuestionSvg from '../assets/question.svg';
import SearchSvg from '../assets/search.svg';
import { Popover } from '@headlessui/react';
import { Fragment } from 'react';
import { userActions } from '../redux/userSlice';

export default function Header() {

    const user = useAppSelector(state => state.user);
    const API = import.meta.env.VITE_API_URL;

    const dispatch = useAppDispatch();
    const [_, navigate] = useLocation();

    function handleLogout() {
        dispatch(userActions.logout());
        navigate('/');
    }

    return (
        <>
        <div className={`fixed top-0 left-0 w-full h-12 flex justify-between 
        items-center px-10 border-b border-gray-300 z-[999] bg-gray-100`}>
            <div className='flex items-center'>
                <Link to='/boards' className=''>
                    <div className='header-button !py-2 cursor-pointer'>
                        <LogoText className='-mt-1 h-6' />
                    </div>
                </Link>
                <BoardDropdown className='ml-2' name='Recent' />
                <BoardDropdown className='ml-2' name='Starred' />
                <BoardDropdown className='mx-2' name='Templates' />
                <CreateBoardButton />
            </div>
            <div className='flex items-center'>
                <div className='mr-2 flex flex-row-reverse items-center border border-gray-400 rounded py-1'>
                    <input 
                    className='outline-none bg-transparent text-sm header__search-input'
                    placeholder='Search'
                    type="text"  />
                    <SearchSvg className='w-4 h-4 mx-2 stroke-text-300 header__search-svg' />
                </div>
                <div className='hover:bg-gray-200 rounded-full p-[3px] select-none cursor-pointer mr-1'>
                    <BellSvg className='h-[22px] w-[22px] stroke-text-500' />
                </div>
                <div className='hover:bg-gray-200 rounded-full p-[3px] select-none cursor-pointer mr-1'>
                    <QuestionSvg className='h-[22px] w-[22px] stroke-text-500' />
                </div>
                <div className='hover:bg-gray-200 rounded-full p-[3px] select-none cursor-pointer mr-2'>
                    <ThemeToggleSvg className='h-[22px] w-[22px] fill-text-500' />
                </div>
                <Popover as={Fragment}>
                    <div className='relative h-6'>
                        <Popover.Button>
                            <div className={`rounded-full overflow-hidden cursor-pointer border -mt-[1px] 
                            hover:ring-4 ring-gray-300 select-none`}>
                                <img
                                className='h-6 w-6'
                                src={`${API}/resource/${user.avatar_name}`} 
                                alt="profile picture" />
                            </div>
                        </Popover.Button>
                        <Popover.Panel>
                            <div className='absolute bg-white shadow border rounded min-w-[200px] px-3 py-2 right-0 top-10'>
                                <div className='mb-2'>
                                    <span className='text-xs font-semibold text-text-400 uppercase'>Account</span>
                                </div>
                                <div className='flex items-center'>
                                    <img 
                                    className='h-10 w-10 mr-2'
                                    src={`${API}/resource/${user.avatar_name}`} 
                                    alt="pfp" />
                                    <span className='text-sm -mt-1'>{user.login}</span>
                                </div>
                                <div className='border-b -mx-3 my-2'></div>
                                <div
                                onClick={handleLogout} 
                                className='my-1 -mx-3 px-3 cursor-pointer py-2 hover:bg-gray-200'>
                                    <span className='text-sm'>Log out</span>
                                </div>
                            </div>
                        </Popover.Panel>
                    </div>
                </Popover>
            </div>
        </div>
        <div className='h-12'></div>
        </>
    );
}   