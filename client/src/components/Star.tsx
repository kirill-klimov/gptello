import StarSvg from '../assets/star.svg';
import React from 'react';

type Props = {
    starred: boolean;
    onToggle: () => void;
}

export default function Star(props: Props) {

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        props.onToggle();
    }

    return (
        <div 
        onClick={handleClick}
        className='select-none cursor-pointer star'>
            <StarSvg className={`h-4 w-4 stroke-text-500 transition-transform
            ${props.starred ? 'stroke-yellow-500 fill-yellow-500' : ''}`} />
        </div>
    );
}