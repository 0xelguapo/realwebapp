import { useState, useCallback } from "react";
import styles from "./Import.module.css";
import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import { useCSVReader, formatFileSize } from "react-papaparse";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Bucket from "../../shared/components/Import/Bucket";
import DraggableBox from "../../shared/components/Import/DraggableBox";
import { FiInfo } from "react-icons/fi";

function Import() {
  const { CSVReader } = useCSVReader();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [hoverState, setHoverState] = useState(false);

  const [boxes] = useState([
    { name: "First Name", schema: "firstname", type: "BOX" },
    { name: "Last Name", schema: "lastname", type: "BOX" },
    { name: "Company", schema: "company", type: "BOX" },
    { name: "Email", schema: "email", type: "BOX" },
    { name: "Phone", schema: "phone" },
    { name: "Property Street Address", schema: "street", type: "BOX" },
    { name: "Property City", schema: "city", type: "BOX" },
    { name: "Property State", schema: "state", type: "BOX" },
    { name: "Property Zip", schema: "zip", type: "BOX" },
  ]);

  const droppedBoxNames = [];
  const handleDrop = (index, item) => {
    const { schema } = item;
    droppedBoxNames[index] = schema;
    console.log(droppedBoxNames);
  };

  const handleUploadedFile = useCallback((uploadedFile) => {
    if (uploadedFile) {
      setSelectedFile(uploadedFile);
      setHoverState(false);
      console.log(uploadedFile);
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
          <DndProvider backend={HTML5Backend}>
            <div className={styles.twoContainer}>
              <div className={styles.twoLeft}>
                <div className={styles.twoInfoContainer}>
                  <FiInfo size={24} color="76a9fa" />
                  <p className={styles.twoInfoText}>
                    Drag the data fields from the right side to the left side
                    boxes that match your data. Unmapped columns will not be
                    imported.
                  </p>
                </div>
                <div className={styles.twoHeadingContainer}>
                  <h3 className={styles.twoSectionTitle}>
                    Spreadsheet Columns
                  </h3>
                  <div className={styles.hasHeader}>
                    <input type="checkbox" className={styles.hasHeaderInput} />
                    <p>
                      The first row in my file is a column header, do not import
                      it
                    </p>
                  </div>
                </div>
                <div className={styles.mappingsContainer}>
                  {selectedFile &&
                    selectedFile.data[1].map((el, index) => (
                      <div className={styles.previewField} key={index}>
                        <div className={styles.importedField}>
                          <div className={styles.importedFieldHeader}>
                            {selectedFile.data[0][index]}
                          </div>
                          <div className={styles.importedFieldNonHeader}>
                            {el}
                          </div>
                        </div>
                        <div className={styles.mappingField}>
                          <Bucket
                            onDrop={(item) => handleDrop(index, item)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.twoRight}>
                <div className={styles.twoHeadingContainer}>
                  <h3 className={styles.twoSectionTitle}>
                    CoAgent data fields
                  </h3>
                  <p>
                    Drag the correct data fields to your Spreadsheet Columns
                  </p>
                </div>
                <div className={styles.boxesContainer}>
                  {boxes.map((box, index) => (
                    <DraggableBox
                      key={index}
                      name={box.name}
                      schema={box.schema}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DndProvider>
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
