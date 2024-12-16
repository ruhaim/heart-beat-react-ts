import "ag-grid-community/styles/ag-grid.min.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.min.css"; // Optional Theme applied to the Data Grid

import { FC, useCallback, useMemo } from "react";
import { useColorScheme } from "@mui/material/styles";
import { ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react"; // React Data Grid Component

import { useAppDispatch } from "../../../store/storeHooks";
import { setUserDeleteState, setUserEditState } from "../userListSlice";
import { EditUserStateType, User } from "../userTypes";

import { UserListActionButton } from "./UserListActionButton";
import { UserListLoadingOverlay } from "./UserListLoadingOverlay";

type UserListTableProps = {} & AgGridReactProps;

export const UserListTable: FC<UserListTableProps> = (props) => {
  const { mode } = useColorScheme();
  const appDispatch = useAppDispatch();

  const showEditPopup = (data: EditUserStateType) => {
    appDispatch(setUserEditState(data));
  };
  const editBtnClickHandler = useCallback<(data: EditUserStateType) => void>(
    (data) => {
      showEditPopup(data)
    },
    [appDispatch]
  );

  const deleteBtnClickHandler = useCallback<(data: User) => void>(
    (data) => {
      appDispatch(setUserDeleteState({ userId: data.id }));
    },
    [appDispatch]
  );



  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef<User>[]>(
    () => [
      {
        field: "id",
        filter: true,
        maxWidth: 110,
        resizable: false,
      },
      { field: "name", filter: true, minWidth: 120, initialFlex: 1 },
      {
        field: "gender",
        width: 100,
        minWidth: 80,
        resizable: false,
        filter: "agSetColumnFilter",
      },
      { field: "city", filter: "agSetColumnFilter", width: 100, minWidth: 80 },
      {
        field: "dob",
        filter: "agDateColumnFilter",
        width: 100,
        minWidth: 80,
        valueFormatter: ({ value }) => {
          if (!value) {
            return value;
          }
          return Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
          }).format(new Date(value));
        },
        valueGetter: (value) => {
          if (!value.data?.dob) {
            return "";
          }
          return new Date(value.data.dob);
        },
      },
      {
        headerName: "Actions",
        cellRenderer: UserListActionButton,
        cellRendererParams: {
          onEditClick: editBtnClickHandler,
          onDeleteClick: deleteBtnClickHandler,
        },
        pinned: "right",
        sortable: false,
        maxWidth: 100,
      },
    ],
    [deleteBtnClickHandler, editBtnClickHandler]
  );

  return (
    <div
      className={`ag-theme-material${mode === "dark" ? "-dark" : ""}`} // applying the Data Grid theme
      style={{ height: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={props.rowData}
        columnDefs={colDefs}
        onRowDoubleClicked={(row) => {
          showEditPopup(row.data?.id);
        }}
        onFilterChanged={(event) => {
          console.log({ event });
        }}
        onModelUpdated={(event) => {
          console.log(event.newData);
        }}
        loadingOverlayComponent={UserListLoadingOverlay}
        {...props}
      />
    </div>
  );
};
