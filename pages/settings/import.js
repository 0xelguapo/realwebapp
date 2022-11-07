import { useState, useCallback } from "react";
import styles from "./Import.module.css";
import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import update from "immutability-helper";
import StepOne from "../../shared/components/Import/steps-views/StepOne";
import StepTwo from "../../shared/components/Import/steps-views/StepTwo";
import StepThree from "../../shared/components/Import/steps-views/StepThree";
import { API, graphqlOperation } from "aws-amplify";
import { batchCreateClients } from "../../shared/graphql/mutations";

const initialBoxState = [
  { name: "First Name", schema: "firstName", type: "BOX" },
  { name: "Last Name", schema: "lastName", type: "BOX" },
  { name: "Company / Title", schema: "company", type: "BOX" },
  { name: "Email", schema: "email", type: "BOX" },
  { name: "Phone", schema: "phone" },
  { name: "Contact Street Address", schema: "clientStreet" },
  { name: "Contact City", schema: "clientCity" },
  { name: "Contact State", schema: "clientState" },
  { name: "Contact Zip Code", schema: "clientZip" },
  { name: "Property Street Address", schema: "street", type: "BOX" },
  { name: "Property City", schema: "city", type: "BOX" },
  { name: "Property State", schema: "state", type: "BOX" },
  { name: "Property Zip", schema: "zip", type: "BOX" },
];

function Import() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [hoverState, setHoverState] = useState(false);
  const [boxes, setBoxes] = useState(initialBoxState);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  const handleDrop = useCallback(
    (index, item) => {
      setDroppedBoxNames(
        update(droppedBoxNames, {
          [index]: {
            $set: item,
          },
        })
      );
      const indexOf = boxes.findIndex((box) => box.name === item.item.name);
      setBoxes(
        update(boxes, {
          $splice: [[indexOf, 1]],
        })
      );
    },
    [boxes, setBoxes, droppedBoxNames]
  );

  const handleUndrop = (index, item) => {
    setDroppedBoxNames(
      update(droppedBoxNames, {
        [index]: { $set: null },
      })
    );
    setBoxes(
      update(boxes, {
        $unshift: [item],
      })
    );
    console.log(item);
  };

  const handleUploadedFile = (uploadedFile) => {
    if (uploadedFile) {
      setSelectedFile(uploadedFile);
      setHoverState(false);
    }
    setBoxes(initialBoxState);
    setDroppedBoxNames([]);
  };

  const handleImport = async () => {
    if (!selectedFile || !droppedBoxNames) console.error("data missing error");
    else {
      let response;
      const mappedFields = droppedBoxNames.map((item) => item.item.schema);
      try {
        response = await API.graphql(
          graphqlOperation(batchCreateClients, { data: JSON.stringify(selectedFile.data), mappedFields: mappedFields }
          )
        );
      } catch (err) {
        console.error(err);
      }
      console.log(response);
    }
  };

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
            Import your contacts directly from your excel or .csv file.
            {/* You can import contacts and properties separately, or you can import
            contacts along with their associated properties together. */}
          </p>
        </div>
        {currentStep === 0 && (
          <StepOne
            handleUploadedFile={handleUploadedFile}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            hoverState={hoverState}
          />
        )}
        {currentStep === 1 && (
          <StepTwo
            selectedFile={selectedFile}
            boxes={boxes}
            handleDrop={handleDrop}
            handleUndrop={handleUndrop}
            droppedBoxNames={droppedBoxNames}
          />
        )}
        {currentStep === 2 && (
          <StepThree
            droppedBoxNames={droppedBoxNames}
            selectedFile={selectedFile}
            handleImport={handleImport}
          />
        )}
        <div className={styles.buttonContainer}>
          <button
            className={styles.backButton}
            onClick={decrementStep}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep < 2 ? (
            <button
              className={styles.nextButton}
              onClick={incrementStep}
              disabled={!selectedFile}
            >
              Next
            </button>
          ) : (
            <button className={styles.nextButton} onClick={handleImport}>
              Import
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Import.PageLayout = DashboardLayout;

export default Import;
