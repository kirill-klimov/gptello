import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useErrorAndLoading = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
  
    return { error, setError, loading, setLoading };
};