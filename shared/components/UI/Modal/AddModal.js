import { useState, useRef, Fragment, useEffect, useCallback } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { FiX, FiPlus, FiTrash } from "react-icons/fi";

export default function AddModal({ children, buttonTitle, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center w-32 h-11 rounded justify-center bg-ctablue text-white font-bold hover:bg-hoverctablue"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus size={22} />
        {buttonTitle}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsOpen(false)}
          className="relative z-10"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full rounded-md max-w-lg bg-white">
                <div className="flex justify-between rounded-t-md bg-slate-100 px-5 py-5">
                  <Dialog.Title className="font-bold">{title}</Dialog.Title>
                  <FiX
                    size={22}
                    onClick={() => setIsOpen(false)}
                    className="hover:cursor-pointer hover:bg-slate-100 rounded-full"
                  />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
