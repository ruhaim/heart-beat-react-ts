import { FC, useCallback, useMemo, useState } from "react";
import { User } from "../userTypes";

import { AgGridReact, AgGridReactProps } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.min.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.min.css"; // Optional Theme applied to the Data Grid
import { ColDef } from 'ag-grid-community';
import { UserListActionButton } from "./UserListActionButton";
import { useColorScheme } from "@mui/material/styles";
import UserListLoadingOverlay from "./UserListLoadingOverlay";

type UserListTableProps = {
} & AgGridReactProps

export const UserListTable: FC<UserListTableProps> = (props) => {
    const { mode } = useColorScheme();

    const editBtnClickHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        const userId = event.currentTarget.getAttribute("data-id")
        console.log("edit", { userId })
    }, [])

    const showEditPopup = (userId: number | undefined) => {
        //userId
    }

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = useMemo<ColDef<User>[]>(() => [
        {
            field: "id", filter: true, maxWidth: 110,
            resizable: false
        },
        { field: "name", filter: true, minWidth: 120, initialFlex: 1 },
        { field: "gender", filter: true, width: 80, minWidth: 60, resizable: false },
        { field: "city", filter: true },
        { field: "dob", filter: true },
        {
            headerName: "Actions",
            cellRenderer: UserListActionButton,
            cellRendererParams: { onEditClick: editBtnClickHandler },
            pinned: "right",
            maxWidth: 100
        }
    ], []);

    return <div
        className={`ag-theme-material${mode === 'dark' ? '-dark' : ''}`} // applying the Data Grid theme
        style={{ height: '100%' }} // the Data Grid will fill the size of the parent container
    >
        <AgGridReact

            rowData={props.rowData}
            columnDefs={colDefs}
            onRowDoubleClicked={(row) => {
                showEditPopup(row.data?.id)
            }}
            onModelUpdated={(event) => {

                console.log(event.newData)
            }}
            loadingOverlayComponent={UserListLoadingOverlay}
            {...props}


        />
    </div>

} 