import { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";

export default function AddClientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add Client</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <Dialog.Title>Add a Contact</Dialog.Title>
            <Dialog.Description>Create a contact</Dialog.Description>
            <input />
            <button ref={cancelButtonRef}></button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
