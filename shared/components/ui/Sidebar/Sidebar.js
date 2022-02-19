import Link from "next/link";
import Image from "next/Image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoImage}>
          <Image src="/logo.svg" width={35} height={35} alt="logo" />
        </div>
        CoAgent.
      </div>
      <div className={styles.links}>
        <div className={styles.link}>
          <div className={styles.logoImage}>
            <Image src="/people.svg" width={23} height={23} alt="clients" />
          </div>
          <Link href="/dashboard">
            <a>Clients</a>
          </Link>
        </div>
        <div className={styles.link}>
          <div className={styles.logoImage}>
            <Image src="/task.svg" width={23} height={23} alt="task" />
          </div>
          <Link href="/dashboard">
            <a>Tasks</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
