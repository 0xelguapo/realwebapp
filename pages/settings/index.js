import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import styles from "./Settings.module.css";

function Settings() {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard | Settings</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.settingsContainer}></div>
    </div>
  );
}

Settings.PageLayout = DashboardLayout;

export default Settings;
