import { useState, useRef, Fragment, useEffect } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { FiX, FiPlus, FiTrash } from "react-icons/fi";
import AddClientInput from "./AddClientInput";

const initialFormState = {
  firstName: "",
  lastName: "",
  emails: [{ email: "" }],
  phones: [{ phone: "" }],
  clientAddress: "",
  clientCity: "",
  clientState: "",
  clientZip: "",
};

export default function AddClientModal() {
  const { control, ...methods } = useForm({
    defaultValues: initialFormState,
  });
  const {
    reset,
    formState: { errors },
  } = methods;

  const [isOpen, setIsOpen] = useState(false);
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
  });

  useEffect(() => {
    reset(initialFormState);
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    const { emails, phones, ...restOfData } = data;
    let emailsArray = [];
    let phonesArray = [];
    for (const item of emails) {
      emailsArray.push(item.email);
    }
    for (const item of phones) {
      phonesArray.push(item.phone);
    }
    const clientData = {
      ...restOfData,
      email: emailsArray.toString(),
      phone: phonesArray.toString(),
    };
    console.log(clientData);
  };

  return (
    <>
      <button
        className="flex items-center w-32 h-11 rounded justify-center bg-ctablue text-white font-bold hover:bg-hoverctablue"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus size={22} />
        Add Client
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
                  <Dialog.Title className="font-bold">
                    Add a Contact
                  </Dialog.Title>
                  <FiX
                    size={22}
                    onClick={() => setIsOpen(false)}
                    className="hover:cursor-pointer hover:bg-slate-100 rounded-full"
                  />
                </div>

                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="rounded-b-md py-3 px-5">
                      <div className="mb-3">
                        <AddClientInput
                          icon="person"
                          placeholder="First Name"
                          register="firstName"
                          validation={{ required: "Name is required" }}
                          errorMessage={errors.firstName?.message}
                        />
                      </div>
                      <div className="mb-3">
                        <AddClientInput
                          icon="person"
                          placeholder="Last Name"
                          register="lastName"
                        />
                      </div>
                      {emailFields.map((field, index) => (
                        <div className="mb-2 flex" key={field.id}>
                          <AddClientInput
                            key={field.id}
                            icon="email"
                            placeholder="Email"
                            register={`emails.${index}.email`}
                            validation={{
                              pattern: {
                                value:
                                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter a valid email",
                              },
                            }}
                            errorMessage={
                              errors?.emails?.[index]?.email.message
                            }
                          />
                          {index > 0 && (
                            <button
                              className="px-3"
                              type="button"
                              onClick={() => removeEmail(index)}
                            >
                              <FiTrash size={20} color="#878787" />
                            </button>
                          )}
                        </div>
                      ))}
                      {emailFields.length < 5 && (
                        <button
                          type="button"
                          onClick={() => appendEmail({ email: "" })}
                          className="flex items-center mt-1 text-sm text-blue-500"
                        >
                          <FiPlus color="#3b82f6" size={16} />
                          Add Email
                        </button>
                      )}
                      {phoneFields.map((field, index) => (
                        <div className="mt-3 flex" key={field.id}>
                          <AddClientInput
                            icon="phone"
                            placeholder="Phone"
                            register={`phones.${index}.phone`}
                          />
                          {index > 0 && (
                            <button
                              className="px-3"
                              type="button"
                              onClick={() => removePhone(index)}
                            >
                              <FiTrash size={20} color="#878787" />
                            </button>
                          )}
                        </div>
                      ))}
                      {phoneFields.length < 5 && (
                        <button
                          type="button"
                          onClick={() => appendPhone({ phone: "" })}
                          className="flex items-center mt-1 text-sm text-blue-500"
                        >
                          <FiPlus color="#3b82f6" size={16} />
                          Add Phone
                        </button>
                      )}
                    </div>

                    <div className="px-5 py-5">
                      <h3 className="text-sm font-bold text-gray-400">
                        Additional Contact Details
                      </h3>
                      <div className="mt-3">
                        <AddClientInput
                          icon="address"
                          placeholder="Contact's Street Address"
                          register="clientAddress"
                        />
                      </div>
                      <div className="flex mt-3">
                        <div className="flex-1/3">
                          <AddClientInput
                            icon="address"
                            placeholder="City"
                            register="clientCity"
                          />
                        </div>
                        <div className="px-3">
                          <AddClientInput
                            icon="address"
                            placeholder="State"
                            register="clientState"
                          />
                        </div>
                        <div className="">
                          <AddClientInput
                            icon="address"
                            placeholder="Zip"
                            register="clientZip"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end bg-gray-100 rounded-b-md h-[3.5rem] py-3 px-5">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-200 mr-4 rounded px-4"
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-ctablue text-white font-bold px-5 rounded"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
