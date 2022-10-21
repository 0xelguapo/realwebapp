import { useMemo, useState, useEffect } from "react";
import Table from '../../shared/components/Table/Table'
import DashboardLayout from '../../shared/components/UI/Layouts/DashboardLayout'
import Head from 'next/head'
import styles from './Dashboard.module.css'
import EditableCell from "../../shared/components/Table/EditableCell";

const defaultColumn = {
  Cell: EditableCell
}

function Properties () {
  
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
        <Table />
      </div>
    </div>
  )
}

Properties.PageLayout = DashboardLayout

export default Properties