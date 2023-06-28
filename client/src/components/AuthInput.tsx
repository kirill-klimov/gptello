import React, { useState } from 'react';
import { z } from 'zod';
import { parseZodError } from '../utils';
import Eye from '../assets/eye.svg';
import EyeSlash from '../assets/eye-slash.svg';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  label: string;
  name: string;
  className?: string;
  errorMessage?: string;
  type?: "text" | "password";
  tabIndex?: number;
  loading?: boolean;
};

function AuthInput(props: Props) {

  const {
    label, 
    onChange, 
    placeholder,
    value,
    required,
    name,
    className,
    errorMessage,
    type = "text",
    tabIndex,
    loading,
  } = props;
  const [error, setError] = useState<string>('');
  const [isHidden, setHidden] = useState<boolean>(true);

  const schema = z.string().nonempty(errorMessage || '');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (required) {
      const validation = schema.safeParse(event.target.value);
      if (validation.success) {
        setError('');
      } else {
        const errros = parseZodError(validation.error);
        setError(errros[0]?.message || '');
      }
    }
    
    onChange(event);
  }

  return (
    <div>
      <label htmlFor={name} className='block mb-2 text-sm text-text-300'>{label}</label>
      <div className='relative'>
        <input
          className={`block bg-gray-200 rounded px-4 py-2 ring-primary-500/50 outline-none
          focus:bg-white focus:ring-4 font-medium ${type !== 'password' ? '' : 'pr-10'}
          hover:bg-primary-50 ${loading ? 'opacity-75' : ''} ${className}`}
          value={value}
          disabled={loading}
          spellCheck={false}
          onChange={handleChange}
          name={name}
          tabIndex={tabIndex}
          placeholder={placeholder}        
          type={type === 'password' && isHidden ? 'password' : 'text'} />
        {
          type === 'password' &&
          <div className='absolute h-full right-0 top-0 w-12 grid place-items-center'>
            {
              isHidden ? 
              <button tabIndex={-1} type='button' onClick={() => setHidden(false)}>
                <Eye className='stroke-gray-500 cursor-pointer h-6 w-6 hover:stroke-text-500' />
              </button> 
              : 
              <button tabIndex={-1} type='button' onClick={() => setHidden(true)}>
                <EyeSlash className='stroke-gray-500 cursor-pointer h-6 w-6 hover:stroke-text-500' />
              </button>
            }
          </div>
        }
      </div>
      { error && <span className='block mt-2 font-semibold text-sm'>{error}</span> }
    </div>
  );
};

export default AuthInput;