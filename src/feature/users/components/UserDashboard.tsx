import { FC } from "react";
import userApi from "../userApi";
import { UserListTable } from "./UserListTable";
import LinearProgress from "@mui/material/LinearProgress";

type UserDashboardProps = {}
const { useGetUsersQuery } = userApi

export const UserDashboard: FC<UserDashboardProps> = () => {

    const { isLoading, data: userList } = useGetUsersQuery()


    return <>
        <UserListTable rowData={userList?.users || []} loading={isLoading} />


    </>

}