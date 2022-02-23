import { useMemo } from "react";
import styles from "./ClientTable.module.css";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useClients } from "../../context/client-context";
import AddClient from "../AddClient/AddClient";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";

export default function ClientTable() {
  const { clientsArray, isLoading } = useClients();

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

  const tableInstance = useTable({ columns, data }, useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
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
              console.log(row)
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
