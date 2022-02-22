import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../shared/components/ui/Layouts/DashboardLayout";
import LoadingSpinner from "../../shared/components/ui/Loading/LoadingSpinner";
import { useClients } from "../../shared/context/client-context";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import GlobalFilter from "../../shared/components/Table/GlobalFilter";
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
