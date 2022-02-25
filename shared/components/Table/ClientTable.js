import { useMemo, useState, useEffect, useRef, forwardRef } from "react";
import styles from "./ClientTable.module.css";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useClients } from "../../context/client-context";
import AddClient from "../AddClient/AddClient";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import Image from "next/image";
import InputCheckbox from "./IndeterminateCheckbox";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    updateMyData(index, id, value);
    setEditMode(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (editMode) {
      console.log("run");
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className={styles.editCellContainer}>
      {editMode ? (
        <>
          <input
            className={styles.editInput}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </>
      ) : (
        <>
          <div className={styles.valueContainer}>{value}</div>
          <button className={styles.editButton} onClick={enterEditMode}>
            <Image src="/editcell.svg" width={20} height={20} alt="edit" />
          </button>
        </>
      )}
    </div>
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

export default function ClientTable() {
  const { clientsArray, isLoading, updateClient } = useClients();
  const [skipPageReset, setSkipPageReset] = useState(false);

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
    selectedFlatRows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state
  } = tableInstance;

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
