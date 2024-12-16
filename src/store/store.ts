import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import userListSlice from "../feature/users-list/userListSlice";

import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [userListSlice.reducerPath]: userListSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
