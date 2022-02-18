import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
    </div>
  );
}
