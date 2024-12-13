import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userTypes';
import userApi from './userApi';

interface UserListState {
  value: number;
  userList: User[]
 
}

const initialState: UserListState = {
  value: 0,
  userList:[],

};


export const userListStateSlice = createSlice({
  name: 'userList',
  reducerPath:"userListState",
  initialState,
  reducers: {
    setList:(state, action: PayloadAction<User[]>)=>{
      state.userList = action.payload
    },
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
  extraReducers:(builder)=>{
    builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled,(state, action,)=>{
      state.userList = action.payload.users
    })
  }


});

export const { increment, decrement, incrementByAmount } = userListStateSlice.actions;

export default {reducer:userListStateSlice.reducer, reducerPath:userListStateSlice.reducerPath};