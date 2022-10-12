import { useEffect, useState, useRef } from "react";
import { VALIDATOR_REQUIRE } from "../../utility/validators";
import Modal from "../UI/Modal/Modal.js";
import Image from "next/image";
import Input from "../Input.js";
import useForm from "../../hooks/form-hook.js";
import styles from "./AddClient.module.css";
import { useClients } from "../../context/client-context";
import { phoneFormat } from "../../utility/phoneFormat";
import { API, graphqlOperation } from "aws-amplify";
import { batchCreateClients } from "../../graphql/mutations";

export default function AddClient() {
  const [open, setOpen] = useState(false);
  const { addClient } = useClients();
  const [initialForm, setInitialForm] = useState({
    name: {
      value: "",
      isValid: false,
    },
    company: {
      value: "",
      isValid: true,
    },
    phone: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
  });
  const [formState, inputHandler] = useForm(initialForm, false);
  const [phoneInputs, setPhoneInputs] = useState([]);

  const clientDetails = {
    name: formState.inputs.name.value,
    company: formState.inputs.company.value,
    phone: [formState.inputs.phone.value, ...phoneInputs],
    email: formState.inputs.email.value,
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDynamicPhoneChange = (index, event) => {
    let data = [...phoneInputs];
    data[index] = event.target.value;
    setPhoneInputs(data);
    console.log(phoneInputs);
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    let newInput = [...phoneInputs, ""];
    setPhoneInputs(newInput);
  };

  const handleRemovePhone = (e, index) => {
    e.preventDefault();
    console.log(index);
    let currentInputs = [...phoneInputs];
    const newArray = currentInputs.filter((el, ind) => ind !== index);
    setPhoneInputs(newArray);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setPhoneInputs([]);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addClient(formState, clientDetails);
    if (response) {
      console.log("success", response);
    } else {
      console.log("some error occured");
    }

  };

  return (
    <div className={styles.container}>
      <button onClick={handleOpen} className={styles.button}>
        <Image src="/add.svg" width={15} height={15} alt="add client" />
        Add Client
      </button>
      {open && (
        <Modal onOpen={handleOpen} title="Add a Contact">
          <div className={styles.modalContainer}>
            <div className={styles.modalForm}>
              <h2 className={styles.modalTitle}>Add a Contact</h2>
              <form>
                <div className={styles.inputBlocks}>
                  <Input
                    id="name"
                    onInput={inputHandler}
                    headerText="Name"
                    placeholder="Required"
                    errorText="Please enter a name"
                    validators={[VALIDATOR_REQUIRE()]}
                  />
                  <Input
                    id="company"
                    onInput={inputHandler}
                    headerText="Company"
                  />
                </div>
                <div className={styles.inputBlocks}>
                  <Input id="email" onInput={inputHandler} headerText="Email" />
                  <div className={styles.phoneBlockContainer}>
                    <Input
                      id="phone"
                      onInput={inputHandler}
                      headerText="Phone Number"
                      phoneInput={true}
                    />
                    {phoneInputs.map((p, index) => (
                      <div
                        key={index}
                        className={styles.additionalPhoneInputContainer}
                      >
                        <input
                          className={styles.dynamicPhoneInput}
                          name="number"
                          value={phoneFormat(phoneInputs[index])}
                          onChange={(event) =>
                            handleDynamicPhoneChange(index, event)
                          }
                        />
                        <button
                          className={styles.removeButton}
                          onClick={(e) => handleRemovePhone(e, index)}
                        >
                          <div className={styles.removeLine}></div>
                        </button>
                      </div>
                    ))}
                    <button
                      className={styles.addButton}
                      onClick={handleAddPhone}
                    >
                      {" "}
                      + Add Number
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className={styles.ctaContainer}>
              <button className={styles.cancel} onClick={handleOpen}>
                Cancel
              </button>
              <button
                className={styles.save}
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
