import styles from "../../styles/Button.module.css";

export default function Button({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}