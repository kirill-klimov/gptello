import { Popover } from "@headlessui/react";
import { BoardUser } from "../redux/boardSlice";
import CrownSvg from '../assets/crown.svg';
import { Fragment } from "react";
import { formatDate } from "../utils";

export default function BoardUserItem(item: BoardUser) {

    const API = import.meta.env.VITE_API_URL;

    return (
        <Popover as={Fragment}>
            <div className="relative">
                <Popover.Button>
                    <div className="relative -mb-1">
                        {item.role !== 'OWNER' ? <></> : <CrownSvg className="absolute -top-2 left-[50%] -translate-x-[50%] h-4 w-4 scale-y-75 fill-yellow-300" />}
                        <img 
                        className="h-7 w-7 shrink-0"
                        src={`${API}/resource/${item.user.avatar_name}`} alt="pfp" />
                    </div>
                </Popover.Button>
                <Popover.Panel>
                    <div className="absolute top-8 right-0 min-w-[250px] rounded-md overflow-hidden shadow-md border-2 border-primary-500">
                        <div className="bg-primary-500 flex items-center p-3">
                            <img 
                            className="h-10 w-10 shrink-0 mr-3"
                            src={`${API}/resource/${item.user.avatar_name}`} alt="pfp" />
                            <span className="text-white text-lg font-medium min-w-max">{item.user.login}</span>
                        </div>
                        <div className="bg-white p-3">
                            <span className="text-sm text-text-700">Joined on{` `}{formatDate(item.created_at)}</span>
                        </div>
                    </div>
                </Popover.Panel>
            </div>
        </Popover>
    );
}