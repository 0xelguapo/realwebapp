import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./EditableCell.module.css";
import { FiEdit3 } from "react-icons/fi";
import EditCellModal from "./EditCellModal";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

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
    <div className={styles.editCellContainer}>
      {editMode ? (
        <>
          {id === "email" && (
            <EditCellModal
              title="Edit Emails"
              handleCancel={() => setEditMode(false)}
            >
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
        </>
      ) : (
        <>
          <div className={styles.valueContainer}>{value}</div>
          <button className={styles.editButton} onClick={enterEditMode}>
            <FiEdit3 size={15} color="#4e4e4e" />
          </button>
        </>
      )}
    </div>
  );
};

export default EditableCell;
