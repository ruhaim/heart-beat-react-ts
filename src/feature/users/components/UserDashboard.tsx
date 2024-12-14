import { FC } from "react";

import userApi from "../userApi";

import { UserListTable } from "./UserListTable";

const { useGetUsersQuery } = userApi;

export const UserDashboard: FC = () => {
  const { isLoading, data: userList } = useGetUsersQuery();

  return (
    <>
      <UserListTable rowData={userList?.users || []} loading={isLoading} />
    </>
  );
};
