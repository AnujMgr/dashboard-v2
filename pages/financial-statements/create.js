import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import prisma from "./../../prisma/client";
import { useRouter } from "next/router";
import FormikControl from "../../components/Formik/FormikControl";
import SelectWithSearch from "../../components/SelectWithSearch/SelectWithSearch";

//https://stackoverflow.com/questions/59595653/how-to-render-an-editable-table-with-formik-2-and-react-table-7

export async function getServerSideProps({ query }) {
  var statementLines = [];
  const companies = await prisma.company.findMany();
  const statements = await prisma.financialStatement.findMany({});

  if (Object.keys(query).length === 0) {
    return { props: { statements, statementLines, companies } };
  }
  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(query.statementId),
    },
    include: {
      financialStatementLine: true,
    },
    orderBy: {
      sequence: "asc",
    },
  });

  data.map((statement) => {
    statementLines.push({ ...statement.financialStatementLine });
  });

  return { props: { statements, statementLines, companies } };
}

const initialFormData = undefined;

export default function Create({ companies, statementLines, statements }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
  ];

  const fiscalYearOptions = [
    { id: "1", name: "2021" },
    { id: "2", name: "2020" },
    { id: "3", name: "2019" },
    { id: "4", name: "2018" },
    { id: "5", name: "2017" },
    { id: "6", name: "2016" },
  ];

  const companiesOptions = [];
  companies.map((company) =>
    companiesOptions.push({ value: company.id, label: company.name })
  );

  useEffect(() => {
    setFormData(initialFormData); // To avoid errors from initial values
    // this is replacement for a network call that would load the data from a server
    var noOfStatements = [];
    {
      statementLines.map((data) => noOfStatements.push({ amount: 0 }));
    }

    setTimeout(() => {
      setFormData({
        statementId: "",
        companyId: "",
        fiscalYear: "",
        quarter: "",
        statements: noOfStatements,
      });
      console.log("From Outside");
    }, 1000);
    // console.log(formData);

    // Missing dependency array here
  }, [router.query.statementId]);

  async function submitData(data) {
    const response = await fetch(
      "/api/financialStatements/financialStatementFacts",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    statements: Yup.array().of(
      Yup.object().shape({
        amount: Yup.string().required("This Field is Required !"), // these constraints take precedence
      })
    ),
    statementId: Yup.string().required("Please Select Statement !"), // these constraints take precedence
    companyId: Yup.string().required("Please Select Company !"), // these constraints take precedence
    quarter: Yup.string().required("Please Select Quarter !"), // these constraints take precedence
    fiscalYear: Yup.string().required("Please Select Fiscal Year !"), // these constraints take precedence
  });

  return (
    <>
      <h1 className="text-white text-2xl mt-4 mb-8 font-bold">
        Create Statement
      </h1>
      {formData && (
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              // await console.log(values);
              // var submitData = [];
              console.log(values);
              alert(JSON.stringify(values, undefined, 2));

              await statementLines.map((line, index) => {
                values.statements[index]["id"] = line.id;
              });

              // await submitData(values);
              setSubmitting(false);
              resetForm();
            } catch (err) {
              // return <Toast message={err.message} />;
              console.log(err.message);
            }
          }}
          handleChange={(e) => console.log(e)}
          validationSchema={DisplayingErrorMessagesSchema}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <div className="grid grid-cols-4 gap-2">
                {/*---------------- Financial Statements ---------------*/}
                <FormikControl
                  control="select"
                  label="Financial Statements"
                  name="statementId"
                  options={statements}
                  // value={statementId}
                  onChange={(e) => {
                    handleChange(e);
                    // setStatementId(e.target.value);
                    router.push({
                      pathname: "/financial-statements/create",
                      query: {
                        statementId: e.target.value,
                      },
                    });
                  }}
                />

                {/*---------------- Company ---------------*/}
                <div>
                  <SelectWithSearch
                    name="companyId"
                    options={companiesOptions}
                    label="Company"
                    handleChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <FormikControl
                  control="select"
                  label="Company"
                  name="companyId"
                  options={companies}
                /> */}

                {/*---------------- Quarter ---------------*/}
                <FormikControl
                  control="select"
                  label="Quarter"
                  name="quarter"
                  options={quarterOptions}
                />

                {/*---------------- FiscalYear ---------------*/}
                <FormikControl
                  control="select"
                  label="Fiscal Year"
                  name="fiscalYear"
                  options={fiscalYearOptions}
                />
              </div>

              <div className="overflow-x-auto scrollable">
                <div className="grid grid-cols-5 border-b border-gray-600">
                  <div className="col-span-3 p-2 bg-gray-800">Statement</div>
                  <div className="col-span-2 p-2 bg-gray-800">Amount</div>
                </div>

                <FieldArray name="statements">
                  <>
                    {statementLines.map((line, index) => (
                      <div
                        key={line.id}
                        className="grid grid-cols-7 border-b border-gray-600"
                      >
                        <>
                          <div className="col-span-4 p-2 ">{line.name}</div>
                          <div className="col-span-3">
                            {/* {console.log(values["statements"][index].amount)} */}
                            <FormikControl
                              type="input"
                              control="input"
                              name={`statements[${index}].amount`}
                            />
                          </div>
                        </>
                      </div>
                    ))}
                  </>
                </FieldArray>
              </div>

              {statementLines.length > 0 ? (
                isSubmitting ? (
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
                    className="px-3 py-1 mt-4 bg-blue-900 shadow-md rounded"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                )
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
