import { useCSVReader, formatFileSize } from "react-papaparse";
import styles from "./StepOne.module.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FcAcceptDatabase, FcAbout, FcApproval } from "react-icons/fc";

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
        <div className={styles.subContainer}>
          <div className={styles.iconContainer}>
            <FcAcceptDatabase size={36} />
          </div>
          <div>
            <h3 className={styles.subHeadingText}>
              Check out examples on how your data should look
            </h3>
            <p>Download .xlsx (excel) sample file</p>
            <p>Download .csv sample file</p>
          </div>
        </div>

        <div className={styles.subContainer}>
          <div className={styles.iconContainer}>
            <FcAbout size={36} />
          </div>
          <div>
            <h3 className={styles.subHeadingText}>
              Make sure you have your mandatory fields filled out
            </h3>
            <p>Each contact must have a first name</p>
            <p>Each property must have a street name</p>
          </div>
        </div>

        <div className={styles.subContainer}>
          <div className={styles.iconContainer}>
            <FcApproval size={36} />
          </div>
          <div>
            <h3 className={styles.subHeadingText}>Instant Uploads</h3>
            <p>
              Once you&apos;ve completed the simple two step process,
              you&apos;re all done!
            </p>
          </div>
        </div>
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
