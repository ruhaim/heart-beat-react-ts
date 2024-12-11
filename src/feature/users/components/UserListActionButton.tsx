import { CustomCellRendererProps } from "ag-grid-react";
import { FC } from "react";

type UserListActionButtonProps = CustomCellRendererProps & {
    onEditClick: React.MouseEventHandler<HTMLButtonElement>
}

export const UserListActionButton: FC<UserListActionButtonProps> = (props) => {
    return (
        <button onClick={props.onEditClick} data-id={props.data.id}>Edit</button>
    );
};