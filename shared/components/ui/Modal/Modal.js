import styles from "./Modal.module.css";

export default function Modal({ open, children }) {
  return <>{open && <div className={styles.container}>{children}</div>}</>;
}
