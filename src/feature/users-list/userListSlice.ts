import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import userApi from "./userApi";
import { CreateUserStateType, DeleteUserStateType, EditUserStateType, User } from "./userTypes";


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
      action: PayloadAction<EditUserStateType | undefined>
    ) => {
      state.editState = action.payload;
    },
    setUserDeleteState: (
      state,
      action: PayloadAction<DeleteUserStateType | undefined>
    ) => {
      state.deleteState = action.payload;
    },
    setUserCreateState: (
      state,
      action: PayloadAction<CreateUserStateType | undefined>
    ) => {
      state.createState = action.payload;
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

  setUserCreateState,
  setUserDeleteState,
  setUserEditState
} = userListStateSlice.actions;

export default {
  reducer: userListStateSlice.reducer,
  reducerPath: userListStateSlice.reducerPath,
};
