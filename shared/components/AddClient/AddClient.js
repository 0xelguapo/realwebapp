import { useEffect, useState } from "react";
import styles from "./AddClient.module.css";
import Modal from "../UI/Modal/Modal.js";
import Image from "next/image";
import Input from "../Input.js";
import useForm from "../../hooks/form-hook.js";
import { VALIDATOR_REQUIRE } from "../../utility/validators";

export default function AddClient() {
  const [open, setOpen] = useState(false);
  const [formState, inputHandler] = useForm(
    {
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
    },
    false
  );

  const clientDetails = {
    name: formState.inputs.name.value,
    company: formState.inputs.company.value,
    phone: formState.inputs.phone.value,
    email: formState.inputs.email.value,
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

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
                <div className={styles.inputContainer}>
                  <Input
                    id="name"
                    onInput={inputHandler}
                    headerText="Name"
                    placeholder="Required"
                    errorText="Please enter a name"
                    validators={[VALIDATOR_REQUIRE()]}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    id="company"
                    onInput={inputHandler}
                    headerText="Company"
                  />
                </div>
              </div>
              <div className={styles.inputBlocks}>
                <div className={styles.inputContainer}>
                  <Input
                    id="phone"
                    onInput={inputHandler}
                    headerText="Phone Number"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input id="email" onInput={inputHandler} headerText="Email" />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
