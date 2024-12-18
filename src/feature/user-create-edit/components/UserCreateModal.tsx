import { FC, Suspense, lazy } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { setUserCreateState } from "../../users-list/userListSlice";

import { FullScreenModal } from "./helper-comps/FullScreenModal";

const UserCreateForm = lazy(() => import('./helper-comps/UserCreateForm'));

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
      {createState &&
        <Suspense>
          <UserCreateForm userEntity={createState.userEntity} />
        </Suspense>
      }
    </FullScreenModal>
  );
};
