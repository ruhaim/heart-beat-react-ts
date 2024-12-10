import { FC } from "react";
import userApi from "../userApi";
import { UserListTable } from "./UserListTable";

type UserDashboardProps = {}
const { useGetUsersQuery } = userApi

export const UserDashboard: FC<UserDashboardProps> = () => {

    const { isLoading, data: userList } = useGetUsersQuery()
    if (isLoading) {
        return <>isLoading</>
    }

    return <>
        <>Testin</>
        <UserListTable userList={userList?.users || []} />


    </>

}