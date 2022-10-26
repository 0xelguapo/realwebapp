import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./EditableCellComponent.module.css";
import EditCellModal from "./EditCellModal";
import update from "immutability-helper";
import { FiEdit3, FiPlus, FiTrash } from "react-icons/fi";
import { phoneFormatRegex } from "../../utility/phoneFormat";

const EditableCellComponent = ({
  value: initialValue,
  row: { index, ...restOfRow },
  column: { Header, id },
  updateMyData,
}) => {
  if (!initialValue) initialValue = "";
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(initialValue.split(",") || "");
  const [inputsArray, setInputsArray] = useState([""]);

  const handleInputArrayChange = (e, index) => {
    if (id === "phone") {
      setInputsArray(
        update(inputsArray, {
          [index]: { $set: phoneFormatRegex(e.target.value) },
        })
      );
    } else {
      setInputsArray(
        update(inputsArray, {
          [index]: { $set: e.target.value },
        })
      );
    }
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
    if (initialValue) {
      setValue(initialValue.split(",") || "");
    }
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
                  value={input}
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
        {Header === "Phone" || Header === "Email" ? (
          <>
            <div className={styles.multiValuesContainer}>
              {value.map((val, i) => {
                if (val.length > 0)
                  return (
                    <div key={i} className={styles.multiValue}>
                      {val}
                    </div>
                  );
              })}
            </div>
            <button className={styles.editButton} onClick={enterEditMode}>
              <FiEdit3 size={15} color="#4e4e4e" />
            </button>
          </>
        ) : (
          <>
            <div className={styles.multiValuesContainer}>
              <div className={styles.value}>{value}</div>
            </div>
            <button className={styles.editButton} onClick={enterEditMode}>
              <FiEdit3 size={15} color="#4e4e4e" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default EditableCellComponent;
