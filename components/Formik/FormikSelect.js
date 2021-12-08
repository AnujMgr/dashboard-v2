import React from "react";
import { ErrorMessage, Field } from "formik";

function FormikSelect(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="mb-4">
      <Field
        className="w-full bg-gray-800 text-white p-2"
        as="select"
        id={name}
        name={name}
        // onChange={(e) => console.log("data", e)}
        {...rest}
      >
        <option>Please Select {label}</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <p className="text-xs my-1 text-red-700">{msg}</p>}
      />
      <label className="text-xs my-1 text-gray-300" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default FormikSelect;

{
  /* <div className="mb-4">
                  <select
                    className="w-full bg-gray-800 text-white p-2"
                    value={statementId}
                    name="statementId"
                    onChange={(e) => {
                      console.log(values);
                      setStatementId(e.target.value),
                        router.push({
                          pathname: "/financial-statements/create",
                          query: {
                            statementId: e.target.value,
                            companyId: companyId,
                            fiscalYear: fiscalYear,
                            quarter: quarter,
                          },
                        });
                    }}
                  >
                    <option>Select Statement</option>
                    {statements.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="statementId"
                    render={(msg) => (
                      <p className="text-xs my-1 text-red-700">{msg}</p>
                    )}
                  />
                  <h3 className="text-xs my-1 text-gray-300">
                    Financial Statements
                  </h3>
                </div> */
}
