import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./EditableCell.module.css";
import EditCellModal from "./EditCellModal";
import update from "immutability-helper";
import { FiEdit3, FiPlus, FiTrash } from "react-icons/fi";

const EditableCell = ({
  value: initialValue,
  row: { index, ...restOfRow },
  column: { Header, id },
  updateMyData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [inputsArray, setInputsArray] = useState([""]);

  const handleInputArrayChange = (e, index) => {
    setInputsArray(
      update(inputsArray, {
        [index]: { $set: e.target.value },
      })
    );
  };

  const handleAddAnotherInput = useCallback(() => {
    setInputsArray(
      update(inputsArray, {
        $push: [" "],
      })
    );
  }, [inputsArray]);

  const handleRemoveAnotherInput = (index) => {
    setInputsArray(
      update(inputsArray, {
        $splice: [[index, 1]],
      })
    );
  };

  const handleSubmit = (e) => {
    let editInputs = {};
    setEditMode(false);
    if (id === "Name") {
      editInputs = {
        firstName: inputsArray[0],
        lastName: inputsArray[1] || "",
      };
    } else {
      editInputs = {
        [id]: inputsArray.toString(),
      };
    }
    updateMyData(index, editInputs);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (id === "Name") {
      setInputsArray([
        restOfRow.original.firstName,
        restOfRow.original.lastName || "",
      ]);
    } else {
      if (initialValue) {
        setInputsArray(initialValue.split(",").map((item) => item.trim()));
      } else {
        setInputsArray([initialValue || ""]);
      }
    }
  }, [initialValue, editMode, id, restOfRow.original]);

  return (
    <>
      <div className={styles.editCellContainer}>
        {editMode && (
          <EditCellModal
            title={`Edit ${Header}`}
            handleCancel={() => setEditMode(false)}
            handleSubmit={handleSubmit}
          >
            {inputsArray.map((input, index) => (
              <div key={index} className={styles.inputContainer}>
                <input
                  className={styles.input}
                  value={inputsArray[index]}
                  onChange={(e) => handleInputArrayChange(e, index)}
                  autoFocus={true}
                  onKeyDown={handleEnter}
                />
                {index > 0 && id !== "Name" && (
                  <button
                    className={styles.deleteInputButton}
                    onClick={() => handleRemoveAnotherInput(index)}
                  >
                    <FiTrash size={18} color="#878787" />
                  </button>
                )}
              </div>
            ))}
            {Header === "Email" ||
              (Header === "Phone" && (
                <button
                  className={styles.addAnotherButton}
                  onClick={handleAddAnotherInput}
                >
                  <FiPlus size={18} color="#f83f8" />
                  Add Another {Header}
                </button>
              ))}
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
