import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray, Field, getIn, ErrorMessage } from "formik";
import Input from "./Input";
import Toast from "../../components/Toast";
import * as Yup from "yup";
import prisma from "./../../prisma/client";
import { useRouter } from "next/router";
import FormikSelect from "../../components/Formik/FormikSelect";
import FormikInput from "../../components/Formik/FormikInput";
import FormikControl from "../../components/Formik/FormikControl";

//https://stackoverflow.com/questions/59595653/how-to-render-an-editable-table-with-formik-2-and-react-table-7

export async function getServerSideProps({ query }) {
  var statementLines = [];
  const companies = await prisma.company.findMany();
  const statements = await prisma.financialStatement.findMany({});

  if (Object.keys(query).length === 0) {
    const companies = [];
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
  const [statementId, setStatementId] = useState(
    router.query.hasOwnProperty("statementId") ? router.query.statementId : ""
  );
  const [companyId, setCompanyId] = useState(
    router.query.hasOwnProperty("companyId") ? router.query.statementId : ""
  );
  const [quarter, setQuarter] = useState(
    router.query.hasOwnProperty("quarter") ? router.query.statementId : ""
  );
  const [fiscalYear, setFiscalYear] = useState(
    router.query.hasOwnProperty("fiscalYear") ? router.query.statementId : ""
  );

  // Select Options
  const statementLinesOptions = [{ key: "Select Statement", value: "" }];
  statements.map((line) =>
    statementLinesOptions.push({ key: line.name, value: line.id })
  );
  const companiesOptions = [{ key: "Select Company", value: "" }];
  companies.map((company) =>
    companiesOptions.push({ key: company.name, value: company.id })
  );

  const quarterOptions = [
    { key: "Select Quarter", value: "" },
    { key: "Q1", value: "Q1" },
    { key: "Q2", value: "Q2" },
    { key: "Q3", value: "Q3" },
    { key: "Q4", value: "Q4" },
  ];

  const fiscalYearOptions = [
    { key: "Select Fiscal Year", value: "" },
    { key: "2021", value: "2021" },
    { key: "2020", value: "2020" },
    { key: "2019", value: "2019" },
    { key: "2018", value: "2018" },
    { key: "2017", value: "2017" },
    { key: "2016", value: "2016" },
  ];

  useEffect(() => {
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
              await console.log(values);
              alert(JSON.stringify(values, undefined, 2));
              // await saveData(values);
              setSubmitting(false);
              resetForm();
              // <Toast />;
            } catch (err) {
              console.log(err);
            }
          }}
          handleChange={(e) => console.log(e)}
          validationSchema={DisplayingErrorMessagesSchema}
        >
          {({ values, isSubmitting, errors, handleChange }) => (
            <Form>
              <div className="grid grid-cols-4 gap-2">
                {/*---------------- Financial Statements ---------------*/}
                <FormikControl
                  control="select"
                  label="Financial Statements"
                  name="statementId"
                  options={statementLinesOptions}
                  // value={statementId}
                  onChange={(e) => {
                    handleChange(e);
                    setStatementId(e.target.value);
                    router.push({
                      pathname: "/financial-statements/create",
                      query: {
                        statementId: e.target.value,
                        // companyId: companyId,
                        // fiscalYear: fiscalYear,
                        // quarter: quarter,
                      },
                    });
                  }}
                />

                {/*---------------- Company ---------------*/}
                <FormikControl
                  control="select"
                  label="Company"
                  name="companyId"
                  options={companiesOptions}
                  value={companyId}
                  onChange={(e) => {
                    handleChange(e);
                    setCompanyId(e.target.value);
                    // router.push({
                    //   pathname: "/financial-statements/create",
                    //   query: {
                    //     statementId: statementId,
                    //     companyId: e.target.value,
                    //     fiscalYear: fiscalYear,
                    //     quarter: quarter,
                    //   },
                    // });
                  }}
                />

                {/*---------------- Quarter ---------------*/}
                <FormikControl
                  control="select"
                  label="Quarter"
                  name="quarter"
                  options={quarterOptions}
                  value={quarter}
                  onChange={(e) => {
                    handleChange(e);
                    setQuarter(e.target.value);
                  }}
                />

                {/*---------------- FiscalYear ---------------*/}
                <FormikControl
                  control="select"
                  label="Fiscal Year"
                  name="fiscalYear"
                  options={fiscalYearOptions}
                  value={fiscalYear}
                  onChange={(e) => {
                    handleChange(e);
                    setFiscalYear(e.target.value);
                  }}
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
