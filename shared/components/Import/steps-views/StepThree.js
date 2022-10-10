import styles from "./StepThree.module.css";

export default function StepThree({droppedBoxNames, selectedFile}) {
  console.log(droppedBoxNames);
  console.log(selectedFile);
  
  return (
    <div className={styles.container}>
      <div className={styles.previewContainer}>
        <div className={styles.previewHeadingContainer}>
          <h3 className={styles.previewHeading}>Preview import data</h3>
          <p className={styles.previewHeadingSubtext}>
            Please validate the first 3 rows of your imported file
          </p>
        </div>
      </div>
    </div>
  );
}
