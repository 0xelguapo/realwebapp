import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import { FiCheck, FiX } from "react-icons/fi";

export default function ComboBox({
  data,
  inputPlaceholderText,
  setGroupBoxVisible,
  handleSubmit
}) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const handleCloseModal = () => {
    setSelected("");
    setQuery("");
    setGroupBoxVisible(false);
  };

  const handleAdd = async () => {
    // console.log(selected)
    await handleSubmit(selected.id)
  }

  const filteredData =
    query === ""
      ? data
      : data.filter((d) =>
          d.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="absolute w-72 py-2 px-2 rounded-lg shadow-2xl bg-white border">
      {/* <div className="absolute -right-2 -top-2 bg-red-400 rounded-full py-[1px] px-[1px]"><FiX size={15} color="white" /></div> */}
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
              displayValue={(d) => d.title}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={inputPlaceholderText}
              autoFocus={true}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Create a new group <span className="font-bold">{`"${query}"`}</span>
                </div>
              ) : (
                filteredData.map((d) => (
                  <Combobox.Option
                    key={d.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={d}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {d.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
        <div className="flex w-full justify-end mt-2">
          <button
            onClick={handleCloseModal}
            className="bg-gray-200 mr-2 rounded px-4 py-[2px] hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="bg-ctablue text-white font-bold px-5 py-[2px] rounded hover:bg-extrahoverctablue" onClick={handleAdd}>
            Add
          </button>
        </div>
      </Combobox>
    </div>
  );
}
