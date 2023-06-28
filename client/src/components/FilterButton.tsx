import FilterSvg from '../assets/filter.svg';

type Props = {
    className?: string
}

export default function FilterButton(props: Props) {
    return (
        <div className={`select-none ${props.className}`}>
            <div className='flex items-center cursor-pointer rounded hover:bg-gray-400/50 p-2 -m-2 active:bg-gray-500/50'>
                <FilterSvg className='h-4 w-4 stroke-gray-200 mr-2' />
                <span className='text-gray-200 text-sm'>Filter</span>
            </div>
        </div>
    );
}