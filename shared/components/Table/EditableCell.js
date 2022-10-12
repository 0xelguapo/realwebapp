import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./EditableCell.module.css";
import { FiEdit3 } from "react-icons/fi";
import EditCellModal from "./EditCellModal";
import update from "immutability-helper";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { Header, id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  const [inputsArray, setInputsArray] = useState([""]);
  const inputRef = useRef(null);

  const handleInputArrayChange = (e, index) => {
    setInputsArray(
      update(inputsArray, {
        [index]: { $set: e.target.value },
      })
    );
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    if (value === initialValue) {
      setEditMode(false);
      return;
    }
    updateMyData(index, id, value);
    setEditMode(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // useEffect(() => {
  //   if (editMode) {
  //     inputRef.current.focus();
  //   }
  // }, [editMode]);

  return (
    <>
      <div className={styles.editCellContainer}>
        {editMode && (
          <EditCellModal
            title={`Edit ${Header}`}
            handleCancel={() => setEditMode(false)}
          >
            {inputsArray.map((input, index) => (
              <input
                key={index}
                className={styles.input}
                value={inputsArray[index]}
                onChange={(e) => handleInputArrayChange(e, index)}
              />
            ))}
            {/* <input
                className={styles.editInput}
                value={value}
                onChange={handleChange}
                onKeyDown={handleEnter}
                onBlur={handleBlur}
                ref={inputRef}
              /> */}
          </EditCellModal>
        )}
        <div className={styles.valueContainer}>{value}</div>
        <button className={styles.editButton} onClick={enterEditMode}>
          <FiEdit3 size={15} color="#4e4e4e" />
        </button>
      </div>
    </>
  );
};

export default EditableCell;
