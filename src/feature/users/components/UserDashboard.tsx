import { FC } from "react";
import userApi from "../userApi";

type UserDashboardProps = {}
const { useGetUsersQuery } = userApi

export const UserDashboard: FC<UserDashboardProps> = () => {

    const { isLoading, data: userList } = useGetUsersQuery()
    if (isLoading) {
        return <>isLoading</>
    }

    return <>
<>Testin</>
        <div>{userList?.map((user) => <div key={user.id}>

            {JSON.stringify(user)}
        </div>)}</div>

    </>

}