import { useEffect, useReducer } from "react";
import styles from "../../styles/Input.module.css";
import { validate } from "../utility/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const handleChange = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };

  const handleTouch = () => {
    dispatch({ type: "TOUCH" });
  };

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div className={styles.container}>
      <p className={styles.headerText}>{props.headerText}</p>
      <input
        id={props.id}
        placeholder={props.placeholder}
        className={styles.input}
        onChange={handleChange}
        onBlur={handleTouch}
        value={inputState.value} 
        type={props.type}
      />
      {!inputState.isValid && inputState.isTouched && (
        <p className={styles.error}>{props.errorText}</p>
      )}
    </div>
  );
}

Input.defaultProps = {
  validators: [],
};
