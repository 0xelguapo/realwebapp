import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import Image from "next/image";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onOpen}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.closeButtonContainer}>
        <button className={styles.closeButton} onClick={props.onOpen}>
          <Image src="/close.svg" width={20} height={20} alt="close modal" />
        </button>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement =
  typeof window === "object" ? document.getElementById("modal-root") : "";

const Modal = (props) => {

  return (
    <>
      {typeof window === "object" ? (
        <>
          {ReactDOM.createPortal(<Backdrop onOpen={props.onOpen} />, portalElement)}
          {ReactDOM.createPortal(
            <ModalOverlay onOpen={props.onOpen}>{props.children}</ModalOverlay>,
            portalElement
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
