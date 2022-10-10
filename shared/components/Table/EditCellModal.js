import styles from "./EditCellModal.module.css";

export default function EditCellModal({ title, handleCancel, children }) {
  return (
    <>
    <div className={styles.overlay} onClick={handleCancel}></div>
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h3>{title}</h3>
      </div>
      <div className={styles.body}>
        {children}
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
    </>
  );
}
