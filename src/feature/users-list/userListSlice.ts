import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import userApi from "./userApi";
import { CreateUserStateType, DeleteUserStateType, EditUserStateType, User } from "./userTypes";
import { number } from "prop-types";

interface UserListState {
  value: number;
  userList: User[];
  createState?: CreateUserStateType;
  editState?: EditUserStateType;
  deleteState?: DeleteUserStateType;
}

const initialState: UserListState = {
  value: 0,
  userList: [],
};

export const userListStateSlice = createSlice({
  name: "userList",
  reducerPath: "userListState",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    setUserEditState: (
      state,
      action: PayloadAction<UserListState["editState"]>
    ) => {
      debugger
      state.editState = action.payload;
    },
    setUserDeleteState: (
      state,
      action: PayloadAction<UserListState["deleteState"]>
    ) => {
      state.deleteState = action.payload;
    },
    setUserCreateState: (
      state,
      action: PayloadAction<UserListState["createState"]>
    ) => {
      state.createState = action.payload;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUsers.matchFulfilled,
      (state, action) => {
        state.userList = action.payload.users;
      }
    );
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setUserCreateState,
  setUserDeleteState,
  setUserEditState
} = userListStateSlice.actions;

export default {
  reducer: userListStateSlice.reducer,
  reducerPath: userListStateSlice.reducerPath,
};
