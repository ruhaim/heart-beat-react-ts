import { CustomCellRendererProps } from "ag-grid-react";

type UserListActionButtonProps = CustomCellRendererProps & {
    onEditClick: React.MouseEventHandler<HTMLButtonElement>
}

export const UserListActionButton = (props: UserListActionButtonProps) => {
    return (
        <button onClick={props.onEditClick} data-id={props.data.id}>Edit</button>
    );
};