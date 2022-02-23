import { useEffect, useState, useRef } from "react";
import styles from "./AddClient.module.css";
import Modal from "../UI/Modal/Modal.js";
import Image from "next/image";
import Input from "../Input.js";
import useForm from "../../hooks/form-hook.js";
import { VALIDATOR_REQUIRE } from "../../utility/validators";

export default function AddClient() {
  const [open, setOpen] = useState(false);
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
    e.preventDefault()
    let newInput = [...phoneInputs, ""]
    setPhoneInputs(newInput)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setPhoneInputs([])
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clientDetails)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleOpen} className={styles.button}>
        <Image src="/add.svg" width={15} height={15} alt="add client" />
        Add Client
      </button>
      {open && (
        <Modal onOpen={handleOpen}>
          <div className={styles.modalContainer}>
            <h2>Add a Contact</h2>
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
                  />
                  {phoneInputs.map((p, index) => (
                    <input
                    className={styles.dynamicPhoneInput}
                      key={index}
                      name="number"
                      value={phoneInputs[index]}
                      onChange={(event) =>
                        handleDynamicPhoneChange(index, event)
                      }
                    />
                  ))}
                  <button className={styles.addButton} onClick={handleAddPhone}> + Add Number</button>
                </div>
              </div>
            </form>
            <div className={styles.ctaContainer}>
              <button className={styles.cancel} onClick={handleOpen}>Cancel</button>
              <button className={styles.save} type="submit" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
