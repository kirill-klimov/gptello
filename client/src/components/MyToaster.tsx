import React from 'react';
import toast, { Toast } from 'react-hot-toast';
import Warning from '../assets/warning.svg';

type Y_axis = "top" | "bottom";
type X_axis = "left" | "right" | "center";
type Position = `${Y_axis}-${X_axis}`;

type Props = {
    t: Toast;
    message: string;
    type?: 'error' | 'success' | 'info' | 'warning';
    duration?: number;
    dismissButton?: boolean;
    position?: Position;
};


const MyToaster = (props: Props) => {

    const type = props.type ? props.type : 'error';

    const { t, message, dismissButton } = props;

    return (
        <div className={`${t.visible ? 'toast-enter' : 'toast-leave'}`}>
            <div className='bg-orange-400 rounded px-3 py-2 flex items-center shadow ring-orange-500/50 active:ring-2'>
                <Warning className='block stroke-white w-6 h-auto mr-2 shrink-0' />
                <span className='block -mt-1 text-white'>{message}</span>
            </div>
            {/* <button onClick={() => toast.dismiss(t.id)}>X</button> */}
        </div>
    );
}

export default function toastMe(message: string, opts?: Partial<Props>) {

    const { duration, type, position } = opts || {};

    toast.custom((t) => 
        <MyToaster 
        t={t} 
        type={type} 
        message={message} />, { 
            duration: duration || 3500, 
            position: position ||  'top-center'
        });
}