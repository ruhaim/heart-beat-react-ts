import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserListState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserListState = {
  value: 0,
  status: 'idle',
};


export const userListStateSlice = createSlice({
  name: 'counter',
  reducerPath:"userListState",
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

});

export const { increment, decrement, incrementByAmount } = userListStateSlice.actions;

export default {reducer:userListStateSlice.reducer, reducerPath:userListStateSlice.reducerPath};