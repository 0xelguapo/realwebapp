import { useState, useCallback } from "react";
import styles from "./Import.module.css";
import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import { useCSVReader, formatFileSize } from "react-papaparse";

function Import() {
  const { CSVReader } = useCSVReader();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [hoverState, setHoverState] = useState(false);

  const handleUploadedFile = useCallback((uploadedFile) => {
    if (uploadedFile) {
      setSelectedFile(uploadedFile);
      setHoverState(false);
      console.log(uploadedFile)
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setHoverState(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHoverState(false);
  };

  const incrementStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const decrementStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    {
      Component: (
        <div className={styles.stepOneContainer}>
          <div className={styles.oneLeftContainer}>
            <h1 className={styles.headingText}>
              Before uploading your file
            </h1>

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
                      <div className={styles.remove} {...getRemoveFileProps()}>
                        <Remove color={"red"} />
                      </div>
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
      ),
    },
    {
      Component: (
        <>
          <div className={styles.twoContainer}>
            <div className={styles.twoLeft}>
              <h3 className={styles.twoLeftTitle}>
                Spreadsheet Columns
              </h3>
              <div className={styles.hasHeader}>
                <input type="checkbox" className={styles.hasHeaderInput} />
                <p>The first row in my file is a column header, do not import it</p>
              </div>
              <div className={styles.mappingsContainer}>
                {selectedFile &&
                  selectedFile.data[1].map((el, index) => (
                    <div className={styles.previewField} key={index}>
                      <div className={styles.importedField}>{el}</div>
                      <div className={styles.mappedField}></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>CoAgent Dashboard | Settings</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h1 className={styles.headingText}>Import Data</h1>
          <p className={styles.headingDescription}>
            You can import only contacts, or you can import contacts along with
            their associated properties together.
          </p>
        </div>
        {steps[currentStep].Component}
        <div className={styles.buttonContainer}>
          <button
            className={styles.backButton}
            onClick={decrementStep}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className={styles.nextButton}
            onClick={incrementStep}
            disabled={!selectedFile}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

Import.PageLayout = DashboardLayout;

export default Import;
