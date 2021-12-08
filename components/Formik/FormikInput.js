import React from "react";
import { ErrorMessage, Field } from "formik";

function FormikInput(props) {
  const { label, name, ...rest } = props;
  return (
    <>
      {label !== null ? (
        <label className="text-white" htmlFor={name}>
          {label}
        </label>
      ) : null}

      <Field
        className="px-2 py-2 bg-gray-800 text-white w-full h-auto"
        id={name}
        name={name}
        {...rest}
      />
      <div>
        <ErrorMessage
          name={name}
          render={(msg) => <p className="text-xs my-1 text-red-700">{msg}</p>}
        />
      </div>
    </>
  );
  // const [field] = useField({ name, type: "text", validate: validate });
  // const input = (
  //   <input
  //     className="px-2 py-2 bg-gray-800 text-white w-full h-full"
  //     name={name}
  //     type="text"
  //     placeholder={placeholder}
  //     {...field}
  //   />
  // );

  // if (label) {
  //   return (
  //     <div>
  //       <label className="text-white" htmlFor={name}>
  //         {label}
  //       </label>
  //       {input}
  //     </div>
  //   );
  // }
  // return input;
}

export default FormikInput;
