import Head from "next/head";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import ClientTable from "../../shared/components/Table/ClientTable";

function Dashboard() {

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
       <ClientTable />
      </div>
    </div>
  );
}

Dashboard.PageLayout = DashboardLayout;

export default Dashboard;
