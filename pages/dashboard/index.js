import { useEffect } from "react";
import Head from "next/head";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../shared/components/ui/Layouts/DashboardLayout";
import LoadingSpinner from "../../shared/components/ui/Loading/LoadingSpinner";
import { useClients } from "../../shared/context/client-context";
import EachClient from "../../shared/components/EachClient/EachClient";

function Dashboard() {
  const { clientsArray } = useClients();
  console.log(clientsArray)
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
        <div className={styles.clientsHeaderContainer}></div>
        {clientsArray.map(c => <EachClient key={c.id}/>)}
      </div>
    </div>
  );
}

Dashboard.PageLayout = DashboardLayout;

export default Dashboard;
