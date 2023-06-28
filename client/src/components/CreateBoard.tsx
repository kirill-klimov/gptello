// @ts-nocheck
import { useState } from 'react';
import ChevronLeftSvg from '../assets/chevron-left.svg';
import XSvg from '../assets/x.svg';
import BackgroundSelector, { BackgroundType } from './BackgroundSelector';
import { backgrounds } from '../presets/background';
import { z } from 'zod';
import { parseZodError } from '../utils';
import VisibilitySelector, { Visibility } from './VisibilitySelector';
import MyButton from './MyButton';
import { trpc } from '../trpc';
import { useLocation } from 'wouter';

type Props = {
    className?: string
    close: () => void
    back?: () => void
}

export default function CreateBoard(props: Props) {
    
    const [bg, setBg] = useState({
        type: BackgroundType.Color,
        value: backgrounds.colors[0]
    });
    
    const nameSchema = z.string().nonempty('👋 Board name is required');
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Private);

    const [location, navigate] = useLocation();

    async function handleCreate() {
        if (!name.length) return;
        const board = await trpc.board.create.mutate({
            name,
            background_type: bg.type,
            background_value: bg.value,
            visibility
        });
        navigate(`/board/${board.id}`);
        props.close();
    }

    return (
        <div className={`${props.className}`}>
            <div className='flex justify-between items-center p-2 border-b'>
                {!props.back ? <div className='w-4'></div> : <div onClick={props.back} className='cursor-pointer p-1 hover:bg-gray-100 rounded-full'>
                    <ChevronLeftSvg className='w-4 h-4 stroke-text-500' />
                </div>}
                <span className='text-sm'>Create board</span>
                <div onClick={props.close} className='cursor-pointer p-1 hover:bg-gray-100 rounded-full'>
                    <XSvg className='w-4 h-4 stroke-text-500' />
                </div>
            </div>
            <div className='p-2'>
                <div className='mb-4'>
                    <span className='text-xs font-bold block mb-2'>Background</span>
                    <BackgroundSelector 
                    selected={bg}
                    onChange={item => setBg(item)} />
                </div>
                <div className='mb-4'>
                    <span className='text-xs font-bold block mb-1'>Board name <span className='text-red-500'>*</span></span>
                    <input 
                    value={name}
                    spellCheck={false}
                    onChange={e => {
                        const value = e.target.value;
                        const validation = nameSchema.safeParse(value);
                        if (validation.success) {
                            setNameError('');
                        } else {
                            const errors = parseZodError(validation.error);
                            setNameError(errors[0]?.message || '');
                        }
                        setName(value)
                    }}
                    type="text" 
                    className={`outline-none text-sm px-2 py-1 rounded w-full border
                    focus:ring-2 focus:border-transparent ring-primary-500/50 ${nameError !== '' ? 'ring-2 ring-red-500/50' : ''}`} />
                    <span className='text-sm block my-1'>{nameError}</span>
                </div>
                <div className='mb-4'>
                    <span className='text-xs font-bold block mb-1'>Visibility</span>
                    <VisibilitySelector 
                    onChange={value => setVisibility(value)}
                    selected={visibility} />
                </div>
                <div className='mb-2'>
                    <MyButton
                    onClick={handleCreate}
                    className='w-full'
                    text='Create'
                    style='subtle' /> 
                </div>
                <div className='mb-2'>
                    <MyButton
                    onClick={() => {}}
                    className='w-full'
                    text='Start with a template'
                    style='secondary' /> 
                </div>
            </div>
        </div>
    );
}