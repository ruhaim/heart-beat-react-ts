import { FC, useCallback, useMemo, useState } from "react";
import { User } from "../userTypes";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.min.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.min.css"; // Optional Theme applied to the Data Grid
import { ColDef } from 'ag-grid-community';
import { UserListActionButton } from "./UserListActionButton";
import { useColorScheme } from "@mui/material/styles";

type UserListTableProps = {
    userList: User[]
}

export const UserListTable: FC<UserListTableProps> = (props) => {
    const { userList } = props
    const { mode } = useColorScheme();

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

    return <div
        className={`ag-theme-material${mode === 'dark' ? '-dark' : ''}`} // applying the Data Grid theme
        style={{ height: '100%' }} // the Data Grid will fill the size of the parent container
    >
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            onRowDoubleClicked={(row) => {
                showEditPopup(row.data?.id)
            }}
            onModelUpdated={(event) => {

                console.log(event.newData)
            }}

        />
    </div>

} 