import Image from "next/image";
import styles from "./Success.module.css";

export default function Success({ children }) {
  return (
    <div className={styles.container}>
      <Image src="/check.svg" width={23} height={23} alt="success" />
      {children}
    </div>
  );
}
