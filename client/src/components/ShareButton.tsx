import UserPlusSvg from '../assets/user-plus.svg';

type Props = {
    className?: string
}

export default function ShareButton(props: Props) {
    return (
        <div className={`select-none ${props.className}`}>
            <div className='flex items-center bg-black/40 cursor-pointer rounded hover:bg-black/30 p-2 -m-2 active:bg-black/50'>
                <UserPlusSvg className='h-4 w-4 stroke-gray-200 mr-2' />
                <span className='text-gray-200 text-sm'>Share</span>
            </div>
        </div>
    );
}