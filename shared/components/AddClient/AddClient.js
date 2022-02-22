import { useState } from "react";
import styles from "./AddClient.module.css";
import Modal from "../UI/Modal/Modal.js";
import Image from "next/image";

export default function AddClient() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        <Image src="/add.svg" width={15} height={15} alt="add client" />
        Add Client
      </button>
      <Modal open={open}/>
    </div>
  );
}
