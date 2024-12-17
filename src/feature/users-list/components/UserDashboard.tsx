import { FC } from "react";

import { UserCreateModal } from "../../user-create-edit/components/UserCreateModal";
import { UserEditModal } from "../../user-create-edit/components/UserEditModal";
import { UserDeleteConfirmPrompt } from "../../user-delete/UserDeleteConfirmPrompt";
import userApi from "../userApi";

import { UserListTable } from "./UserListTable";

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
