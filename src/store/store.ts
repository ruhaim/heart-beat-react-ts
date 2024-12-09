import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userPageState from '../feature/users/userPageStateSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    [userPageState.reducerPath]: userPageState.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;