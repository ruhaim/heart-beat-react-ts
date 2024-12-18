import { FC, Suspense } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { setUserEditState } from "../../users-list/userListSlice";

import { FullScreenModal } from "./helper-comps/FullScreenModal";
import CircularProgress from "@mui/material/CircularProgress";

import { lazy } from 'react';

const UserEditForm = lazy(() => import('./helper-comps/UserEditForm'));

export const UserEditModal: FC = () => {
  const editState = useAppSelector((state) => state.userListState.editState);
  const appDispatch = useAppDispatch();

  return (
    <FullScreenModal
      open={!!editState || false}
      actionBtns={<></>}
      onClose={() => {
        appDispatch(setUserEditState());
      }}
    >
      {editState && (
        <Suspense fallback={<CircularProgress />}>
          <UserEditForm
            userId={editState.userId}
            userEntity={editState.userEntity}
          />
        </Suspense>
      )}
    </FullScreenModal>
  );
};
