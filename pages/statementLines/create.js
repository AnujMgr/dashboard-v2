import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/Formik/FormikControl";

//https://stackoverflow.com/questions/59595653/how-to-render-an-editable-table-with-formik-2-and-react-table-7

const initialFormData = undefined;

export default function Create() {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // this is replacement for a network call that would load the data from a server
    setTimeout(() => {
      setFormData({
        statementName: "",
        statements: [{ name: "", parentId: 0, unit: "Rs" }],
      });
    }, 1000);
    // Missing dependency array here
  }, []);

  async function saveData(data) {
    const response = await fetch("/api/financialStatements/statementLines", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    statementName: Yup.string().min(2, "Too Short!").required("Required**"),

    statements: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(2, "Too Short!").required("Required**"), // these constraints take precedence
      })
    ),
  });

  return (
    <>
      <h1 className="text-xl my-3 font-bold">Create Statement</h1>
      {formData && (
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              // await saveData(values);
              alert(JSON.stringify(values, undefined, 2));

              setSubmitting(false);
              resetForm();
            } catch (err) {
              console.log(err);
            }
          }}
          validationSchema={DisplayingErrorMessagesSchema}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-5 border-b border-gray-600 overflow-x-auto scrollable">
                <div className="col-span-5 md:col-span-3 mb-3">
                  <FormikControl
                    label="Statement Name"
                    type="input"
                    control="input"
                    name="statementName"
                    placeholder="Enter Statement Name..."
                  />
                </div>

                <div className="col-span-3 p-2 bg-gray-700 mb-1">
                  <h1>Statments</h1>
                </div>
                <div className="col-span-2 p-2 bg-gray-700 mb-1">
                  <h1>Action</h1>
                </div>

                <FieldArray name="statements">
                  {(arrayHelpers) => (
                    <>
                      {values.statements && values.statements.length > 0 ? (
                        values.statements.map((statement, index) => (
                          <>
                            <div className="col-span-3 mb-1">
                              <FormikControl
                                type="input"
                                control="input"
                                name={`statements[${index}].name`}
                                placeholder="Enter Statement Name..."
                              />
                            </div>
                            <div className="col-span-2 mb-1 flex items-start">
                              <button
                                type="button"
                                className="px-3 mt-1 py-1 bg-red-600 ml-2 shadow-md rounded text-white"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        ))
                      ) : (
                        <p>Click on Add to add fields..</p>
                      )}

                      <div className="w-full flex mt-4">
                        <button
                          className="px-3 py-1 bg-green-600 shadow-md rounded"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: "",
                              parentId: 0,
                              unit: "Rs.",
                            })
                          }
                        >
                          Add
                        </button>

                        {isSubmitting ? (
                          <button
                            type="submit"
                            className="px-3 py-1 bg-gray-300 ml-2 shadow-md rounded cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            Submitting
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-3 py-1 bg-blue-900 ml-2 shadow-md rounded"
                            disabled={isSubmitting}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
              {/* <FieldArray name="statements">
                {(arrayHelpers) => (
                  <div className="overflow-x-auto scrollable">
                    <div className="w-full flex mt-4">
                      <button
                        className="px-3 py-1 bg-green-600 shadow-md rounded"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            parentId: 0,
                            unit: "Rs.",
                          })
                        }
                      >
                        Add
                      </button>

                      {isSubmitting ? (
                        <button
                          type="submit"
                          className="px-3 py-1 bg-gray-300 ml-2 shadow-md rounded cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          Submitting
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-3 py-1 bg-blue-900 ml-2 shadow-md rounded"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </FieldArray> */}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { Formik, Form, FieldArray, useFormik } from "formik";
// import Input from "./Input";
// import Statement from "./Statement";
// //import "./styles.css";

// const initialFormData = { firstName: "", friends: [] };

// export default function Create() {
//   const [formData, setFormData] = useState(initialFormData);
//   useEffect(() => {
//     // this is replacement for a network call that would load the data from a server
//     setTimeout(() => {
//       setFormData({
//         firstName: "First Name 1",
//         friends: [
//           {  id: 0, firstName: "First Name 2", lastName: "Last Name 2" },
//         ]
//       });
//     }, 1000);
//   });

//   return (
//     <div className="app">
//       <Formik initialValues={formData} enableReinitialize>
//         <Form onSubmit={formik.handleSubmit}>
//           <Input className="px-2" name="firstName" label="Name: " placeholder="Enter Name..."/>
//           <FieldArray name="friends">
//             {arrayHelpers => (
//               <Statement
//                 name="friends"
//                 handleAdd={arrayHelpers.push}
//                 handleRemove={arrayHelpers.remove}
//               />
//             )}
//           </FieldArray>
//           <button type="submit">Submit</button>

//         </Form>
//       </Formik>
//     </div>
//   );
// }
{
  /* <Input
                  name="statementName"
                  placeholder="Enter Statement Name..."
                />
                <h1 className="text-red-500">
                  <ErrorMessage name="statementName" />
                </h1>
                <h6 className="text-xs">Statement Name</h6> */
}

{
  /* <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="text-white">S.N</th>
                          <th className="text-white">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.statements && values.statements.length > 0 ? (
                          values.statements.map((statement, index) => (
                            <tr key={index}>
                              <td className="felx">
                                <Input
                                  name={`statements[${index}].name`}
                                  placeholder="Enter Statement Name..."
                                />
                                <br />
                                <span className="text-red-500">
                                  <ErrorMessage
                                    name={`statements[${index}].name`}
                                  />
                                </span>
                              </td>
                              <td className="flex">
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-red-600 ml-2 shadow-md rounded text-white"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>Click on Add to add fields..</td>
                          </tr>
                        )}
                      </tbody>
                    </table> */
}
