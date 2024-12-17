import { FC } from "react";

import userApi from "../userApi";

import { UserListTable } from "./UserListTable";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { FullScreenModal } from "../../user-create-edit/FullScreenModal";
import { UserEditForm } from "../../user-create-edit/UserEditForm";
import { setUserCreateState, setUserEditState } from "../userListSlice";
import { UserCreateForm } from "../../user-create-edit/UserCreateForm";

const { useGetUsersQuery } = userApi;

export const UserDashboard: FC = () => {
  const editState = useAppSelector((state) => state.userListState.editState)
  const createState = useAppSelector((state) => state.userListState.createState)
  const appDispatch = useAppDispatch()
  const { isLoading, data: userList } = useGetUsersQuery();

  return (
    <>
      <FullScreenModal open={!!editState || false} actionBtns={<></>} onClose={() => {
        appDispatch(setUserEditState());
      }}>
        {editState && <UserEditForm userId={editState.userId} userEntity={editState.userEntity} />}
      </FullScreenModal>
      <FullScreenModal open={!!createState || false} actionBtns={<></>} onClose={() => { appDispatch(setUserCreateState()) }}>
        {createState && <UserCreateForm userEntity={createState.userEntity} />}
      </FullScreenModal>
      <UserListTable rowData={userList?.users || []} loading={isLoading} />
    </>
  );
};
