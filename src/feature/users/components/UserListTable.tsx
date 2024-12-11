import { FC, useCallback, useMemo, useState } from "react";
import { User } from "../userTypes";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from 'ag-grid-community';
import { UserListActionButton } from "./UserListActionButton";

type UserListTableProps = {
    userList: User[]
}

export const UserListTable: FC<UserListTableProps> = (props) => {
    const { userList } = props

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState(userList);

    const editBtnClickHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        const userId = event.currentTarget.getAttribute("data-id")
        console.log("edit", { userId })
    }, [])

    const showEditPopup = (userId: number | undefined) => {
        //userId
    }

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = useMemo<ColDef<User>[]>(() => [
        { field: "id" },
        { field: "name", filter: true },
        { field: "gender", filter: true },
        { field: "city", filter: true },
        { field: "email", filter: true },
        { headerName: "Actions", cellRenderer: UserListActionButton, cellRendererParams: { onEditClick: editBtnClickHandler } }
    ], []);

    return <div>
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onRowDoubleClicked={(row) => {
                    showEditPopup(row.data?.id)
                }}
            />
        </div>
    </div>
} 