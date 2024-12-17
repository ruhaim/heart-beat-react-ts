import { FC } from "react";
import { FullScreenModal } from "./FullScreenModal";
import { UserCreateForm } from "./UserCreateForm";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { setUserCreateState } from "../users-list/userListSlice";

export const UserCreateModal: FC = () => {
    const createState = useAppSelector((state) => state.userListState.createState)
    const appDispatch = useAppDispatch()


    return (<FullScreenModal open={!!createState || false} actionBtns={<></>} onClose={() => { appDispatch(setUserCreateState()) }}>
        {createState && <UserCreateForm userEntity={createState.userEntity} />}
    </FullScreenModal >)
}
