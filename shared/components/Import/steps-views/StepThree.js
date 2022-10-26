import { useEffect } from "react";
import styles from "./StepThree.module.css";

export default function StepThree({ droppedBoxNames, selectedFile }) {
  // console.log(droppedBoxNames);
  // console.log(selectedFile);


  return (
    <div className={styles.container}>
      <div className={styles.previewContainer}>
        <div className={styles.previewHeadingContainer}>
          <h3 className={styles.previewHeading}>Preview import data</h3>
          <p className={styles.previewHeadingSubtext}>
            Please validate the first 3 rows of your imported file
          </p>
        </div>
        <div className={styles.body}>
          {droppedBoxNames.map((box, index) => {
            if (box) {
              return (
                <div key={index} className={styles.previewRowsContainer}>
                  <div className={styles.previewRowHeader}>{box.item.name}</div>
                  <div className={styles.previewRow}>
                    {selectedFile.data[1][index]
                      ? selectedFile.data[1][index]
                      : "<second row is blank>"}
                  </div>
                  <div className={styles.previewRow}>
                    {selectedFile.data[2][index]
                      ? selectedFile.data[2][index]
                      : "<third row is blank>"}
                  </div>
                  <div className={styles.previewRow}>
                    {selectedFile.data[3][index]
                      ? selectedFile.data[3][index]
                      : "<fourth row is blank>"}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
