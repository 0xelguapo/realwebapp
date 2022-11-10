import AddModal from "../UI/Modal/AddModal";
import { useState, useEffect } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Input from "../UI/Form/Input";

const initialFormState = {
  street: "",
  city: "",
  state: "",
  zip: "",
  price: "",
  note: "",
  clientId: "",
};

export default function AddPropertyModal() {
  const dispatch = useDispatch();
  const { control, ...methods } = useForm({
    defaultValues: initialFormState,
  });
  const {
    reset,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset(initialFormState);
  }, [isOpen, reset, isSubmitSuccessful]);

  return (
    <>
      <AddModal
        buttonTitle="Add Property"
        title="Add a Property"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((date) => console.log(data))}>
            <div className="rounded-b-md py-3 px-5">
              <div className="mb-3">
                <Input
                  icon="building"
                  placeholder="Street Address"
                  register="street"
                  validation={{ required: "Street is required" }}
                  errorMessage={errors.firstName?.message}
                />
              </div>
              <div className="mb-3">
                <Input icon="building" placeholder="City" register="city" />
              </div>
              <div className="flex mb-3">
                <div className="flex-1">
                  <Input icon="building" placeholder="State" register="state" />
                </div>
                <div className="ml-2 flex-1">
                  <Input
                    icon="building"
                    placeholder="Zip Code"
                    register="zip"
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </AddModal>
    </>
  );
}
