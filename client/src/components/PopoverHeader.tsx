
import XSvg from '../assets/x.svg';

type Props = {
    close: Function
    text: string
    className?: string
    style?: "big"
}

export default function PopoverHeader(props: Props) {
    return (
        <div className={`border-b flex items-center justify-between pb-2 mb-2 ${props.style === 'big'?'pb-3 pt-1':''} ${props.className}`}>
            <div />
            <span className={`text-sm text-gray-500 ${props.style === 'big'?'!text-base font-medium':''}`}>{props.text}</span>
            <div 
            onClick={_ => props.close()}
            className="rounded-full hover:bg-gray-200 p-1 -m-1 cursor-pointer">
                <XSvg className={`h-5 w-5 stroke-text-500 ${props.style === 'big'?'stroke-2':''}`} />
            </div>
        </div>
    );
}