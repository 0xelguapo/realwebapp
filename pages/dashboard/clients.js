import Head from "next/head";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import Table from "../../shared/components/Table/Table";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClient, fetchClients, selectAllClients } from "../../shared/redux/clients-slice";
import { useClients } from "../../shared/context/client-context";
import Success from "../../shared/components/UI/Status/Success";
import AddClientModal from "../../shared/components/AddClient/AddClientModal";
import EditableCell from "../../shared/components/Table/EditableCell";
import SideModal from "../../shared/components/UI/Modal/SideModalClient";

const defaultColumn = {
  Cell: EditableCell,
};

function Dashboard() {
  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);
  const status = useSelector((state) => state.clients.status);
  const { successStatus, successMessage } = useClients();
  const [skipPageReset, setSkipPageReset] = useState(false);


  const data = useMemo(() => {
    return [...allClients];
  }, [allClients]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) =>
          row.lastName ? row.firstName + " " + row.lastName : row.firstName,
      },
      { Header: "Company", accessor: "company" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Email", accessor: "email" },
    ],
    []
  );

  const updateMyData = async (rowIndex, editInputs) => {
    setSkipPageReset(true);
    const clientId = data[rowIndex].id;
    let clientInputs = {
      id: clientId,
      ...editInputs,
    };
    dispatch(editClient(clientInputs));
  };

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
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard | Clients</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.tableContainer}>
        <Success status={successStatus}>{successMessage}</Success>
        <Table
          data={data}
          reduxState={allClients}
          columns={columns}
          defaultColumn={defaultColumn}
          updateMyData={updateMyData}
          status={status}
          skipPageReset={skipPageReset}
          addButton={<AddClientModal />}
        />
        {/* <ClientTable /> */}
      </div>
    </div>
  );
}

Dashboard.PageLayout = DashboardLayout;

export default Dashboard;
