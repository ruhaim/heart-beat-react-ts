import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import userApi from "./userApi";
import { User } from "./userTypes";

interface UserListState {
  value: number;
  userList: User[];
  editState?: {
    active: boolean;
    userEntity?: Partial<User>;
  };
  deleteState?: {
    active: boolean;
    userEntity?: Partial<User>;
  };
}

const initialState: UserListState = {
  value: 0,
  userList: [],
  editState: {
    active: false,
  },
  deleteState: {
    active: false,
  },
};

export const userListStateSlice = createSlice({
  name: "userList",
  reducerPath: "userListState",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    setEditState: (
      state,
      action: PayloadAction<UserListState["editState"]>
    ) => {
      state.editState = action.payload;
    },
    setDeleteState: (
      state,
      action: PayloadAction<UserListState["deleteState"]>
    ) => {
      state.deleteState = action.payload;
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
  setEditState,
  setDeleteState,
} = userListStateSlice.actions;

export default {
  reducer: userListStateSlice.reducer,
  reducerPath: userListStateSlice.reducerPath,
};
