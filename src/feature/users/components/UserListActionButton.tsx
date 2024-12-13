import { IconButton, Stack } from "@mui/material";

import { CustomCellRendererProps } from "ag-grid-react";
import { FC } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

type UserListActionButtonProps = CustomCellRendererProps & {
    onEditClick: React.MouseEventHandler<HTMLButtonElement>
}

export const UserListActionButton: FC<UserListActionButtonProps> = (props) => {
    return (
        <Stack direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: '100%'
            }}>
            <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={props.onEditClick}
                    data-id={props.data.id} >
                    <EditIcon />
                </IconButton>

            </Tooltip>


            <Tooltip title="Delete">

                <IconButton aria-label="delete" onClick={props.onEditClick}
                    data-id={props.data.id} >
                    <DeleteIcon />
                </IconButton>

            </Tooltip>



        </Stack>
    );
};