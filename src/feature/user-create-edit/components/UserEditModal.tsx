import { FC } from "react";
import { FullScreenModal } from "./helper-comps/FullScreenModal";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { setUserEditState } from "../../users-list/userListSlice";
import { UserEditForm } from "./helper-comps/UserEditForm";

export const UserEditModal: FC = () => {
    const editState = useAppSelector((state) => state.userListState.editState)
    const appDispatch = useAppDispatch()


    return (<FullScreenModal open={!!editState || false} actionBtns={<></>} onClose={() => {
        appDispatch(setUserEditState());
    }}>
        {editState && <UserEditForm userId={editState.userId} userEntity={editState.userEntity} />}
    </FullScreenModal>)
}
