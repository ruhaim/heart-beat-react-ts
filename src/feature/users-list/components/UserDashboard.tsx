import { FC } from "react";

import { UserCreateModal } from "../../user-create-edit/components/UserCreateModal";
import { UserEditModal } from "../../user-create-edit/components/UserEditModal";
import { UserDeleteConfirmPrompt } from "../../user-delete/UserDeleteConfirmPrompt";
import userApi from "../userApi";

import { UserListTable } from "./UserListTable";
import { Alert } from "@mui/material";

const { useGetUsersQuery } = userApi;

export const UserDashboard: FC = () => {
  const { isLoading, data: userList, error } = useGetUsersQuery();

  if (error) {
    return <Alert severity="error">Ooops, something went wrong</Alert>
  }
  return (
    <>
      <UserEditModal />
      <UserCreateModal />
      <UserDeleteConfirmPrompt />
      <UserListTable rowData={userList?.users || []} loading={isLoading} />
    </>
  );
};
