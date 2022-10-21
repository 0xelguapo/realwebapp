import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.links}>
        <Link href="/dashboard/clients">
          <a>
            <div className={styles.link}>
              <div className={styles.logoImage}>
                <Image
                  src="/clients.svg"
                  width={23}
                  height={23}
                  alt="clients"
                />
              </div>
              Clients
            </div>
          </a>
        </Link>
        <Link href="/dashboard/properties">
          <a>
            <div className={styles.link}>
              <div className={styles.logoImage}>
                <Image src="/task.svg" width={23} height={23} alt="task" />
              </div>
              Properties
            </div>
          </a>
        </Link>
        <Link href="/settings">
          <a>
            <div className={styles.link}>
              <div className={styles.logoImage}>
                <Image
                  src="/settings.svg"
                  width={23}
                  height={23}
                  alt="settings"
                />
              </div>
              Settings
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
