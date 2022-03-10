import { useState, useCallback } from "react";
import styles from "./Import.module.css";
import Head from "next/head";
import Image from "next/image";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import { useCSVReader, formatFileSize } from "react-papaparse";

function Import() {
  const { CSVReader } = useCSVReader();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [hoverState, setHoverState] = useState(false);

  const handleUploadedFile = useCallback((uploadedFile) => {
    setSelectedFile(uploadedFile);
    setHoverState(false);
    console.log(selectedFile);
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
    setCurrentStep(prevStep => prevStep + 1);
  }

  const decrementStep = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  const steps = [
    {
      Component: (
        <>
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
                    <p className={styles.selectedFileTitle}>{acceptedFile.name}</p>
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
          <div className={styles.oneDescriptionContainer}>Description Div</div>
        </>
      ),
    },
    {
      Component: (
        <>
        <div className={styles.twoContainer}>
          <div className={styles.columnsContainer}>
            <h3 className={styles.columnsContainerTitle}>Spreadsheet Columns</h3>
            <div className={styles.hasHeader}><input type="checkbox" />The first row in my file is a column header</div>
            <div className={styles.mappingsContainer}>
              {selectedFile &&
              selectedFile.data[1].map((el, index) => 
                <div className={styles.preview} key={index}>{el}</div>
              )}
            </div>
          </div>
        </div>
        </>
      )
    }
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
          <div className={styles.stepsGuide}>
            steps
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={decrementStep}>Back</button>
            <button className={styles.nextButton} onClick={incrementStep} disabled={!selectedFile}>
              Next
            </button>
          </div>
        </div>
        {steps[currentStep].Component}
      </div>
    </div>
  );
}

Import.PageLayout = DashboardLayout;

export default Import;
