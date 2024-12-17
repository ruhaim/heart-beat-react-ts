import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { setUserCreateState } from "../../users-list/userListSlice";

import { FullScreenModal } from "./helper-comps/FullScreenModal";
import { UserCreateForm } from "./helper-comps/UserCreateForm";

export const UserCreateModal: FC = () => {
  const createState = useAppSelector(
    (state) => state.userListState.createState
  );
  const appDispatch = useAppDispatch();

  return (
    <FullScreenModal
      open={!!createState || false}
      actionBtns={<></>}
      onClose={() => {
        appDispatch(setUserCreateState());
      }}
    >
      {createState && <UserCreateForm userEntity={createState.userEntity} />}
    </FullScreenModal>
  );
};
