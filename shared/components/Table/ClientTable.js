import { useMemo, useState } from "react";
import styles from "./ClientTable.module.css";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";
import { useClients } from "../../context/client-context";
import AddClient from "../AddClient/AddClient";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import GlobalFilter from "./GlobalFilter";
import InputCheckbox from "./IndeterminateCheckbox";
import EditableCell from "./EditableCell";

const defaultColumn = {
  Cell: EditableCell,
};

export default function ClientTable() {
  const { clientsArray, isLoading, updateClient, deleteClient } = useClients();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const data = useMemo(() => {
    return [...clientsArray];
  }, [clientsArray]);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Company", accessor: "company" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Email", accessor: "email" },
    ],
    []
  );

  const updateMyData = async (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    const clientObject = { ...data[rowIndex] };
    const { createdAt, updatedAt, owner, ...updatedClient } = clientObject;
    const response = await updateClient({
      ...updatedClient,
      [columnId]: value,
    });
    console.log(response);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <InputCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <InputCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    pageCount,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    selectedFlatRows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  const handleDeleteClient = async () => {
  }

  console.log(selectedFlatRows.map(i => (i.original.id)))
  

  return (
    <div className={styles.clientsContainer}>
      <div className={styles.clientsHeaderContainer}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className={styles.addClientContainer}>
          <AddClient />
        </div>
      </div>
      <div className={styles.pagination}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" < "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" > "}
        </button>
        {Object.keys(state.selectedRowIds).length !== 0 && <button onClick={handleDeleteClient}>Delete</button>}
      </div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={styles.header}
                    key={column.id}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className={styles.row}
                  key={row.original.id}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className={styles.data}
                        key={cell.row.original.id}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
