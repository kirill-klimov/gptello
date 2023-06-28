// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Visibility } from '../components/VisibilitySelector';
import { trpc } from '../trpc';
import { AppDispatch, store } from './store';

export type Card = {
    id: string
    list_id: string
    name: string
    order: number
    content?: string
    created_at: string
    updated_at: string
}
export type List = {
    id: string
    name: string
    order: number
    board_id: string
    created_at: string
    updated_at: string
    cards: Card[]
}
export enum BoardRole {
    OWNER = "OWNER",
    EDITOR = "EDITOR",
}
export type BoardUser = {
  created_at: string
  role: BoardRole
  user: {
      id: string
      avatar_name: string
      login: string
  }
}
export interface BoardState {
    loading: boolean
    id: string
    name: string
    description?: string
    background_type: string
    background_value: string
    created_at: string
    updated_at: string
    visibility: Visibility
    closed_at?: string
    lists: List[]
    starred: boolean
    users_on_boards: BoardUser[]
}

const initialState = { } as BoardState;

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardState>) => ({
      ...state,
      ...action.payload,
    }),
    setStarred: (state: BoardState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        starred: action.payload
      };
    },
    setLists: (state: BoardState, action: PayloadAction<List[]>) => {
      return {
        ...state,
        lists: action.payload
      };
    },
    setLoading: (state: BoardState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload
      };
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

export const fetchBoard = (id: string) => async (dispatch: AppDispatch) => {
  const current_id = store.getState()?.board?.id;
  if (id !== current_id) dispatch(boardActions.setLoading(true));
  const board = await trpc.board.get.query({ id, populate: true });
  dispatch(boardActions.setBoard(board as BoardState));
  dispatch(boardActions.setLoading(false));
}