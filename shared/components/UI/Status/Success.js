import Image from "next/image";
import styles from "./Success.module.css";

export default function Success({ children, status }) {
  return (
    <div className={status ? styles.active : styles.disabled}>
      <div className={styles.image}>
        <Image src="/check.svg" width={23} height={23} alt="success" />
      </div>
      {children}
    </div>
  );
}
