import React from "react";
import { useField } from "formik";

function Input({ name, label, placeholder, validate }) {
  const [field] = useField({ name, type: "text", validate: validate });
  const input = (
    <input
      className="px-2 py-2 bg-gray-800 text-white w-full h-full"
      name={name}
      type="text"
      placeholder={placeholder}
      {...field}
    />
  );

  if (label) {
    return (
      <div>
        <label className="text-white" htmlFor={name}>
          {label}
        </label>
        {input}
      </div>
    );
  }
  return input;
}

export default Input;
