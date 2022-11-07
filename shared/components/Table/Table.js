import { useMemo, useState, useEffect, Fragment } from "react";
import styles from "./Table.module.css";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  usePagination,
} from "react-table";
import { useClients } from "../../context/client-context";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import GlobalFilter from "./GlobalFilter";
import InputCheckbox from "./IndeterminateCheckbox";
import Success from "../UI/Status/Success";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SideModalClient from "../UI/Modal/SideModalClient";
import { Transition } from "@headlessui/react";
import SideModalProperties from "../UI/Modal/SideModalProperties";

export default function Table({
  data,
  reduxState,
  columns,
  defaultColumn,
  addButton,
  updateMyData,
  handleDelete,
  status,
  skipPageReset,
  tableType,
}) {
  const { successStatus, successMessage } = useClients();
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [previewId, setPreviewId] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
      setPreviewIsOpen,
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

  const handleOpenPreview = (id, rowIndex) => {
    setPreviewId(id);
    setPreviewIsOpen(true);
    setPreviewIndex(rowIndex);
  };

  useEffect(() => {
    const detectLeftKey = (e) => {
      if (e.key === "ArrowLeft" && previewIndex > 0) {
        setPreviewIndex((prevState) => prevState - 1);
        setPreviewId(data[previewIndex].id);
      }
    };
    const detectRightKey = (e) => {
      if (
        e.key === "ArrowRight" &&
        previewIndex <
          (data.length - 1 < state.pageSize ? data.length - 1 : state.pageSize)
      ) {
        setPreviewIndex((prevState) => prevState + 1);
        setPreviewId(data[previewIndex].id);
      }
    };
    document.addEventListener("keydown", detectLeftKey);
    document.addEventListener("keydown", detectRightKey);
    return () => {
      document.removeEventListener("keydown", detectLeftKey);
      document.removeEventListener("keydown", detectRightKey);
    };
  }, [previewIndex, state.pageSize, data]);

  return (
    <>
      <div className={styles.tableContainer}>
        <Transition
          show={previewIsOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-[-500px]"
          enterTo="-translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-[-500px]"
          className="fixed flex flex-col h-screen right-0 w-1/4 bg-slate-50 z-[5] shadow-2xl overflow-visible"
        >
          {tableType === "clients" && (
            <>
              <SideModalClient
                previewIsOpen={previewIsOpen}
                setPreviewIsOpen={() => setPreviewIsOpen(!previewIsOpen)}
                previewId={previewId}
              />
            </>
          )}
          {tableType === "properties" && (
            <SideModalProperties
              previewIsOpen={previewIsOpen}
              setPreviewIsOpen={() => setPreviewIsOpen(!previewIsOpen)}
              previewId={previewId}
            />
          )}
        </Transition>

        <Success status={successStatus}>{successMessage}</Success>
        <div className={styles.headerContainer}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className={styles.addContainer}>{addButton}</div>
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
            <button onClick={handleDelete}>Delete</button>
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
                          onClick={() =>
                            handleOpenPreview(cell.row.original.id, i)
                          }
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
    </>
  );
}
