import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../shared/components/ui/Layouts/DashboardLayout";
import LoadingSpinner from "../../shared/components/ui/Loading/LoadingSpinner";
import { useClients } from "../../shared/context/client-context";
import EachClient from "../../shared/components/EachClient/EachClient";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

function Dashboard() {
  const { clientsArray } = useClients();

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
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard | Clients</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.clientsContainer}>
        <div className={styles.clientsHeaderContainer}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        {/* {clientsArray.map((c) => (
          <EachClient key={c.id} />
        ))} */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
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
                <tr key={row.original.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={cell.row.original.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Dashboard.PageLayout = DashboardLayout;

export default Dashboard;
