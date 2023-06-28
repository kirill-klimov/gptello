import React from 'react';
import Spinner from './Spinner';

type Props = {
    as?: "button" | "div"
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
    style?: "solid" | "subtle" | "pale" | "secondary"
    className?: string
    tabIndex?: number
    type?: "button" | "submit"
    loading?: boolean
    disabled?: boolean
}

export default function MyButton(props: Props) {

    function handleClick(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) {
        props.onClick(e);
    }

    return (
        props.as === 'div' ?
        <div
        tabIndex={props.tabIndex} 
        className={`bg-primary-500 rounded h-8 grid place-items-center 
        text-white font-medium cursor-pointer select-none outline-none px-3
        active:bg-primary-400 hover:bg-primary-600 ring-primary-500/50 transition duration-[.05s]
        focus:ring-4 ${props.loading || props.disabled ? 'opacity-75' : ''} 
        ${props.style === 'subtle' ? "text-sm font-normal focus:ring-2" : ''}
        ${props.style === 'pale' ? "text-sm font-normal !bg-primary-100 !text-primary-600" : ''}
        ${props.style === 'secondary' ? "text-sm font-normal !bg-gray-200 !text-gray-600 hover:!bg-gray-300 !focus:ring-0" : ''}
        ${props.className}`} onClick={handleClick}>
            {
                props.loading ?
                <Spinner />
                :
                props.text
            }
        </div>
        :
        <button 
        tabIndex={props.tabIndex} 
        disabled={props.loading}
        type={props.type} className={`bg-primary-500 rounded h-8 grid place-items-center 
        text-white font-medium cursor-pointer select-none outline-none px-3
        active:bg-primary-400 hover:bg-primary-600 ring-primary-500/50 transition duration-[.05s]
        focus:ring-4 ${props.loading || props.disabled ? 'opacity-75' : ''} 
        ${props.style === 'subtle' ? "text-sm font-normal focus:ring-2" : ''}
        ${props.style === 'pale' ? "text-sm font-normal !bg-primary-100 !text-primary-600" : ''}
        ${props.style === 'secondary' ? "text-sm font-normal !bg-gray-200 !text-gray-600 hover:!bg-gray-300 !ring-0" : ''}
        ${props.className}`} onClick={handleClick}>
            {
                props.loading ?
                <Spinner />
                :
                props.text
            }
        </button>
    );
}