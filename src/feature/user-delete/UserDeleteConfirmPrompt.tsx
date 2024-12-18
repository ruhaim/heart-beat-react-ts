import React, { FC, useEffect } from "react";
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { TransitionUp } from "../../theme/transition/TransitionUp";
import userApi from "../users-list/userApi";
import { setUserDeleteState } from "../users-list/userListSlice";

type UserDeleteConfirmPromptProps = {
  onClose?: () => void;
  title?: string;
  actionBtnLabel?: string;
};

export const UserDeleteConfirmPrompt: FC<UserDeleteConfirmPromptProps> = ({
  onClose,
  title = "Are you sure?",
  actionBtnLabel = "Yes",
}) => {
  const deleteState = useAppSelector(
    (state) => state.userListState.deleteState
  );
  const dispatch = useAppDispatch();

  const [triggerDeleteUser, { isLoading, error, reset }] =
    userApi.useDeleteUserMutation();
  const userId = deleteState?.userId;
  const userEntity = deleteState?.userEntity;

  const open = !!userId;
  const handleClose = () => {
    dispatch(setUserDeleteState());
    onClose?.();
  };
  const handleActionButtonClick = async () => {
    if (!userId) {
      return onClose?.();
    }
    const result = await triggerDeleteUser({ id: userId });
    if (result.data) {
      dispatch(setUserDeleteState());
      return onClose?.();
    }
  };

  useEffect(() => {
    if (userId) {
      reset();
    }
  }, [reset, userId]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        data-testid={`user-delete-confirm-${userId}`}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to delete the user{" "}
            {`${userId} ${userEntity?.name ? ` : ${userEntity.name}` : ""} ?`}
          </DialogContentText>
        </DialogContent>

        {error && <Alert severity="error">Ooops, something went wrong</Alert>}
        <DialogActions>
          <Button onClick={handleClose}
            data-testid={`user-delete-dismiss-btn-${userId}`}
            disabled={isLoading}>
            No
          </Button>
          <Button onClick={handleActionButtonClick}
            data-testid={`user-delete-ok-btn-${userId}`}
            disabled={isLoading}>
            {actionBtnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
