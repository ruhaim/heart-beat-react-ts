import { FC } from "react";
import { User } from "../userTypes";

type UserListTableProps = {
    userList: User[]
}

export const UserListTable: FC<UserListTableProps> = (props) => {
    const {userList} = props
    return <div>{userList.map((user)=><div key={user.id}>
        {JSON.stringify(user)}
    </div>)}</div>
}