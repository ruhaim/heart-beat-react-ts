import React, { FC, PropsWithChildren, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenModalProps = {
  onClose?: () => void
  title?: string
  actionBtnLabel?: string
  open: boolean
  onActionButtonClick?: () => void;
  actionBtns?: ReactNode

} & DialogProps

export const FullScreenModal: FC<PropsWithChildren<FullScreenModalProps>> = ({
  children,
  onClose,
  title,
  actionBtnLabel = "Save",
  open,
  actionBtns,
  onActionButtonClick }) => {
  const handleClose = () => {
    onClose?.()
  };
  const handleActionButtonClick = () => {
    if (onActionButtonClick) {
      return onActionButtonClick()
    }
    return onClose?.();
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            {actionBtns || <Button autoFocus color="inherit" onClick={handleActionButtonClick}>
              {actionBtnLabel}
            </Button>}
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </React.Fragment >
  );
};
