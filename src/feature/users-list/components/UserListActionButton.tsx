import { FC, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { CustomCellRendererProps } from "ag-grid-react";

import { User } from "../userTypes";

type UserListActionButtonProps = CustomCellRendererProps<User> & {
  onDeleteClick: (data?: Partial<User>) => void;
  onEditClick: (data?: Partial<User>) => void;
};

export const UserListActionButton: FC<UserListActionButtonProps> = ({
  onDeleteClick,
  onEditClick,
  data,
}) => {
  const editClickHandler = useCallback(() => {
    onEditClick(data);
  }, [onEditClick, data]);

  const deleteClickHandler = useCallback(() => {
    onDeleteClick(data);
  }, [onDeleteClick, data]);
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          onClick={editClickHandler}
          data-id={data?.id}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton
          aria-label="delete"
          onClick={deleteClickHandler}
          data-id={data?.id}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
