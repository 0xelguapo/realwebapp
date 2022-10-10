import { DndProvider } from "react-dnd";
import { FiInfo } from "react-icons/fi";
import Bucket from "../Bucket";
import DraggableBox from "../DraggableBox";
import styles from "./StepTwo.module.css";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function StepTwo({
  boxes,
  selectedFile,
  handleDrop,
  handleUndrop,
  droppedBoxNames
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.twoContainer}>
        <div className={styles.twoLeft}>
          <div className={styles.twoInfoContainer}>
            <FiInfo size={24} color="76a9fa" />
            <p className={styles.twoInfoText}>
              Drag the data fields from the right side to the left side boxes
              that match your data. Unmapped columns will not be imported.
            </p>
          </div>
          <div className={styles.twoHeadingContainer}>
            <h3 className={styles.twoSectionTitle}>Spreadsheet Columns</h3>
            <div className={styles.hasHeader}>
              <input type="checkbox" className={styles.hasHeaderInput} />
              <p>
                The first row in my file is a column header, do not import it
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
                    <div className={styles.importedFieldNonHeader}>{el}</div>
                  </div>
                  <div className={styles.mappingField}>
                    <Bucket
                      onDrop={(item) => handleDrop(index, item)}
                      boxes={boxes}
                      handleUndrop={handleUndrop}
                      indexOf={index}
                      droppedBoxNames={droppedBoxNames}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.twoRight}>
          <div className={styles.twoHeadingContainer}>
            <h3 className={styles.twoSectionTitle}>CoAgent data fields</h3>
            <p>Drag the correct data fields to your Spreadsheet Columns</p>
          </div>
          <div className={styles.boxesContainer}>
            {boxes.map((box, index) => (
              <DraggableBox
                key={index}
                name={box.name}
                item={box}
                boxes={boxes}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
