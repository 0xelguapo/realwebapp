import { useMemo, useState, useEffect } from "react";
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
import Success from "../UI/Status/Success";
import { useDispatch, useSelector } from "react-redux";
import {
  editClient,
  fetchClients,
  selectAllClients,
} from "../../redux/clients-slice";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

const defaultColumn = {
  Cell: EditableCell,
};

export default function ClientTable() {
  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);
  const status = useSelector((state) => state.clients.status);
  const { updateClient, deleteClients, successStatus, successMessage } =
    useClients();
  const [skipPageReset, setSkipPageReset] = useState(false);

  const phoneFormat = (value) => {
    if (value) {
      return value.replace(/[\[\]']+/g, "");
    }
  };

  const data = useMemo(() => {
    return [...allClients];
  }, [allClients]);

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
            <div className={styles.checkBoxContainer}>
              <InputCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div className={styles.checkBoxContainer}>
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
    setPageSize,
    selectedFlatRows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  state.pageSize = 25;

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data, allClients]);

  const handleDeleteClients = async () => {
    console.log(selectedFlatRows);
    // await deleteClients(selectedFlatRows);
  };

  return (
    <div className={styles.clientsContainer}>
      <Success status={successStatus}>{successMessage}</Success>
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
      <div className={styles.pageButtonsContainer}>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={styles.pageButton}
        >
          <IoChevronBack size={20} color="#4e4e4e" />
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={styles.pageButton}
        >
          <IoChevronForward size={20} color="#4e4e4e" />
        </button>
        {Object.keys(state.selectedRowIds).length !== 0 && (
          <button onClick={handleDeleteClients}>Delete</button>
        )}
      </div>
      {status !== "succeeded" ? (
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
            {page.map((row, i) => {
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
