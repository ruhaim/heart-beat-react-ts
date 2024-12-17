import { FC } from "react";

import userApi from "../userApi";

import { UserListTable } from "./UserListTable";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { FullScreenModal } from "../../user-create-edit/components/helpers/FullScreenModal";
import { UserEditForm } from "../../user-create-edit/components/helpers/UserEditForm";
import { setUserCreateState, setUserEditState } from "../userListSlice";
import { UserCreateForm } from "../../user-create-edit/components/helpers/UserCreateForm";
import { UserDeleteConfirmPrompt } from "../../user-delete/UserDeleteConfirmPrompt";
import { UserCreateModal } from "../../user-create-edit/components/UserCreateModal";
import { UserEditModal } from "../../user-create-edit/components/UserEditModal";

const { useGetUsersQuery } = userApi;

export const UserDashboard: FC = () => {
  const { isLoading, data: userList } = useGetUsersQuery();

  return (
    <>
      <UserEditModal />
      <UserCreateModal />
      <UserDeleteConfirmPrompt />
      <UserListTable rowData={userList?.users || []} loading={isLoading} />
    </>
  );
};
