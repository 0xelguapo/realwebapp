import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./EditableCell.module.css";

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
    if(value === initialValue) {
      setEditMode(false)
      return
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

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className={styles.editCellContainer}>
      {editMode ? (
        <>
          <input
            className={styles.editInput}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </>
      ) : (
        <>
          <div className={styles.valueContainer}>{value}</div>
          <button className={styles.editButton} onClick={enterEditMode}>
            <Image src="/editcell.svg" width={20} height={20} alt="edit" />
          </button>
        </>
      )}
    </div>
  );
};

export default EditableCell;
