import { useMemo, useState, useEffect } from "react";
import Table from "../../shared/components/Table/Table";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import Head from "next/head";
import styles from "./Dashboard.module.css";
import EditableCell from "../../shared/components/Table/EditableCell";
import { useDispatch, useSelector } from "react-redux";
import {
  editProperty,
  fetchProperties,
  selectAllProperties,
} from "../../shared/redux/properties-slice";
import EditableCellComponent from "../../shared/components/Table/EditableCellComponent";
import AddClientModal from "../../shared/components/AddClient/AddClientModal";

const defaultColumn = {
  Cell: EditableCellComponent,
};

function Properties() {
  const dispatch = useDispatch();
  const allProperties = useSelector(selectAllProperties);
  const status = useSelector((state) => state.properties.status);
  const [skipPageReset, setSkipPageReset] = useState(false)
  

  const data = useMemo(() => {
    return [...allProperties];
  }, [allProperties]);

  const columns = useMemo(
    () => [
      {
        Header: "Street",
        accessor: "street",
      },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zip" },
      { Header: "Owner", accessor: "clientId" },
    ],
    []
  );

  const updateMyData = async (rowIndex, editInputs) => {
    setSkipPageReset(true);
    const propertyId = data[rowIndex].id;
    let propertyInputs = {
      id: propertyId,
      ...editInputs
    }
    const response = await dispatch(editProperty(propertyInputs)).unwrap()
    console.log(response)
  };

  const handleDelete = async () => {
    
  };

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data, allProperties])

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard | Properties</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.tableContainer}>
        <Table
          data={data}
          reduxState={allProperties}
          columns={columns}
          defaultColumn={defaultColumn}
          updateMyData={updateMyData}
          status={status}
          skipPageReset={skipPageReset}
          addButton={<AddClientModal />}
          tableType="properties"
        />
      </div>
    </div>
  );
}

Properties.PageLayout = DashboardLayout;

export default Properties;
