import { useCSVReader, formatFileSize } from "react-papaparse";
import styles from "./StepOne.module.css";
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

export default function StepOne({
  handleUploadedFile,
  handleDragOver,
  handleDragLeave,
  hoverState,
}) {
  const { CSVReader } = useCSVReader();

  return (
    <div className={styles.stepOneContainer}>
      <div className={styles.oneLeftContainer}>
        <h1 className={styles.headingText}>Before uploading your file</h1>
      </div>
      <div className={styles.oneRightContainer}>
        <CSVReader
          onUploadAccepted={handleUploadedFile}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }) => (
            <div
              className={
                hoverState || acceptedFile
                  ? `${styles.importContainer} ${styles.importContainerActive}`
                  : styles.importContainer
              }
              {...getRootProps()}
            >
              {acceptedFile ? (
                <>
                <IoCheckmarkCircleOutline size={25} color="green" />
                  {/* <div className={styles.remove} {...getRemoveFileProps()}>
                    <Remove color={"red"} />
                  </div> */}
                  <p className={styles.selectedFileTitle}>
                    {acceptedFile.name}
                  </p>
                  <div className={styles.progressBar}>
                    <ProgressBar />
                  </div>
                </>
              ) : (
                <div>Drag your CSV file here or click to upload</div>
              )}
            </div>
          )}
        </CSVReader>
      </div>
    </div>
  );
}
