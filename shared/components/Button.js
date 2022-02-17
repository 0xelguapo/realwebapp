import styles from "../../styles/Button.module.css";

export default function Button({ onClick, disabled, children, type }) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button} type={type}>
      {children}
    </button>
  );
}