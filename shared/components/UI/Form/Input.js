import { useFormContext } from "react-hook-form";
import { FiMail, FiUser, FiPhone, FiHome } from "react-icons/fi";
import { BiBuilding } from 'react-icons/bi'


export default function Input({
  inputType = 'text',
  icon,
  placeholder,
  register,
  validation,
  errorMessage,
}) {
  let iconComponent;
  switch (icon) {
    case "email":
      iconComponent = <FiMail />
      break;
    case "person":
      iconComponent = <FiUser size={16} />
      break;
    case "phone":
      iconComponent = <FiPhone size={16} />
      break;
    case "address":
      iconComponent = <FiHome size={16} />
      break;
    case "building":
      iconComponent = <BiBuilding size={16} />
      break;
  }

  const data = useFormContext();

  return (
    <div className="flex-1">
      {/* <label
        htmlFor="email-address-icon"
        className="block mb-1 text-sm font-medium text-gray-900 "
      >
        Email
      </label> */}
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-2.5 pointer-events-none">
          {iconComponent}
        </div>
        <input
          {...data.register(register, validation)}
          type={inputType}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
      <p className="text-sm text-red-500">{errorMessage}</p>
    </div>
  );
}
