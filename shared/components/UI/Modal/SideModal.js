import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function SideModal({ previewIsOpen, setPreviewIsOpen }) {
  return (
    <Transition appear show={previewIsOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        as="div"
        onClose={() => setPreviewIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full rounded-md max-w-lg bg-black">
            <div className="h-screen w-screen bg-black">

            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
