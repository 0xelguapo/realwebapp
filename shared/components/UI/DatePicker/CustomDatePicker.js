import { forwardRef } from "react";

export const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
  <button
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-auto py-1 px-2 text-left font-medium focus:ring-blue-500 focus:border-blue-500"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));
CustomDatePicker.displayName = "CustomDatePicker";