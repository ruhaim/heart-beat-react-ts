import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import type { CustomLoadingOverlayProps } from "ag-grid-react";

export const UserListLoadingOverlay: FC<
  CustomLoadingOverlayProps & { loadingMessage: string }
> = () => {
  return (
    <Backdrop
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        position: "relative",
      })}
      open={true}
      data-testid="data-grid-loading-overlay"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
