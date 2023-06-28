import { Listbox } from "@headlessui/react";
import ChevronDownSvg from '../assets/chevron-down.svg';
import LockSvg from '../assets/lock.svg';
import GlobeSvg from '../assets/globe.svg';

export enum Visibility {
    Public = "Public",
    Authorized = "Authorized",
    Private = "Private",
}

type Props = {
    selected: Visibility
    onChange: (value: Visibility) => void
}

export default function VisibilitySelector(props: Props) {
    return (
        <div className="relative flex flex-col">
            <Listbox value={props.selected} onChange={props.onChange}>
                <Listbox.Button>
                    <div className={`border-2 rounded flex justify-between items-center px-3 py-1 w-full hover:bg-gray-100`}>
                        <span className="text-sm">{props.selected}</span>
                        <ChevronDownSvg className="w-4 h-4 fill-text-500" /> 
                    </div>
                </Listbox.Button>
                <Listbox.Options>
                    <div className="absolute top-9 border w-full bg-white rounded py-2 shadow-md cursor-pointer">
                        <Listbox.Option key={Visibility.Private} value={Visibility.Private}>
                        {({ selected }) => 
                        <div className={`flex items-center px-2 py-2 pt-1 hover:bg-gray-100 
                        ${selected ? 'bg-primary-100 hover:bg-primary-200' : ''}`}>
                            <LockSvg className={`h-4 w-4 stroke-text-500 shrink-0 mx-3 ml-1
                            ${selected ? 'stroke-primary-700' : ''}`} />
                            <div className={`${selected ? 'text-primary-700' : ''}`}>
                                <span className="text-sm">Private</span>
                                <p className="text-xs">Only board members can see and edit this board.</p>
                            </div>
                        </div>}
                        </Listbox.Option>
                        <Listbox.Option key={Visibility.Public} value={Visibility.Public}>
                        {({ selected }) => 
                        <div className={`flex items-center px-2 py-2 pt-1 hover:bg-gray-100 
                        ${selected ? 'bg-primary-100 hover:bg-primary-200' : ''}`}>
                            <GlobeSvg className={`h-4 w-4 stroke-text-500 shrink-0 mx-3 ml-1
                            ${selected ? 'stroke-primary-700' : ''}`} />
                            <div className={`${selected ? 'text-primary-700' : ''}`}>
                                <span className="text-sm">Public</span>
                                <p className="text-xs">Anyone on the internet can see this board. Only board members can edit.</p>
                            </div>
                        </div>}
                        </Listbox.Option>
                    </div>
                </Listbox.Options>
            </Listbox>
        </div>
    );
}