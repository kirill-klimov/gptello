import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { BackgroundType } from '../components/BackgroundSelector';

export type BoardItem = {
  id: string
  name: string
  background_type: BackgroundType
  background_value: string
  starred: boolean
  last_accessed: string
}

export type Notification = {
  content: string
  created_at: string
  id: string
  status: string
  type: string
}

export interface UserState {
  id?: string
  login?: string
  token?: string
  avatar_name?: string
  preferred_theme?: string
  created_at?: string
  boards?: Array<BoardItem>
  notifications?: Array<Notification>
  archived_boards?: Array<BoardItem>
}

const initialState = { } as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => ({})
  }
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;