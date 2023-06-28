import { Popover, Transition } from "@headlessui/react";
import MyButton from "./MyButton";
import { Fragment, useState } from "react";
import { TransitionProps } from "../utils";
import BoardSvg from '../assets/board.svg';
import TemplateSvg from '../assets/template.svg';
import CreateBoard from "./CreateBoard";

enum Page {
    Home = 'Home',
    Create = 'Create',
    Template = 'Template'
}

export default function CreateBoardButton() {

    const [page, setPage] = useState<Page>(Page.Home);

    return (
        <Popover>
        {({ open }) => 
            <div className='relative'>
                <Popover.Button>
                    <MyButton
                    as="div" 
                    onClick={() => setPage(Page.Home)}
                    style={open ? 'pale' : 'subtle'}
                    text='Create' />
                </Popover.Button>
                <Transition as={Fragment} {...TransitionProps}>
                    <Popover.Panel>
                    {({ close }) => 
                    <div className='absolute bg-white py-2 rounded min-w-[250px] shadow-md'>
                        {
                            page === Page.Home ?
                            <>
                            <button onClick={_ => setPage(Page.Create)} className="p-2 hover:bg-gray-100 w-full">
                                <div className="flex items-center">
                                    <BoardSvg className="h-4 w-4 fill-text-500" />
                                    <span className="block text-sm ml-1">Create board</span>
                                </div>
                                <p className="text-left text-xs mt-1">A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
                            </button>
                            <button className="p-2 hover:bg-gray-100 w-full">
                                <div className="flex items-center">
                                    <TemplateSvg className="h-4 w-4 fill-text-500" />
                                    <span className="block text-sm ml-1">Start with a template</span>
                                </div>
                                <p className="text-left text-xs mt-1">Get started faster with a board template.</p>
                            </button>
                            </> : page === Page.Create ?
                            <CreateBoard 
                            close={close}
                            back={() => setPage(Page.Home)}
                            className="-my-2" /> : <></>
                        }
                    </div>}
                    </Popover.Panel>
                </Transition>
            </div>}
        </Popover>
    );
}