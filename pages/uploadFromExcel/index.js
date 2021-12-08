import React, { useMemo, useState } from "react";
import SelectWithSearch from "../../components/SelectWithSearch/SelectWithSearch";
import prisma from "./../../prisma/client";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toast";

export async function getServerSideProps({ query }) {
  const companies = await prisma.company.findMany({});

  return { props: { companies } };
}

export default function StatementLines({ companies }) {
  const companyOptions = [];

  const [companyId, setCompanyId] = useState(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  companies.map((company) => {
    companyOptions.push({ value: company.id, label: company.name });
  });

  function convertFile(files) {
    const url = "/api/financialStatements/financialStatementFacts";
    const file = files[0];
    const start = 1;
    const columns = 2;
    if (!file) {
      fileNotFoundToast();
      return;
    }
    let reader = new FileReader();

    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      // find the name of your sheet in the workbook first
      let worksheet = workbook.Sheets["Sheet1"];

      // convert to json format
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      //console.log(jsonData);

      uploadData(url, formatData(jsonData, start, columns));
    };
    reader.readAsArrayBuffer(file);
  }

  const fileNotFoundToast = () => toast.error("No file found to read!");

  async function uploadData(url, body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const formatData = (jsonData, start, columns) => {
    console.log("Formatting Data");
    const facts = [];

    for (var col = 1; col <= columns; col++) {
      jsonData.map((data, i) => {
        var tempObj = {};
        //Amount
        if (i > start) {
          // Company Id
          Object.assign(tempObj, { companyId: companyId });
          // FiscalYear
          Object.assign(tempObj, { fiscalYear: jsonData[0]["data" + col] });
          // quarter
          Object.assign(tempObj, { quarter: jsonData[1]["data" + col] });
          //Statement Id
          Object.assign(tempObj, {
            financialStatementLineId: data.id,
          });
          // here 5 elements in object to filter only data element eg data1 data2
          Object.assign(tempObj, {
            amount: data["data" + col],
          });
          facts.push(tempObj);
        }
      });
    }

    return facts;
  };

  return (
    <div className="p-4">
      <h1 className="text-white text-xl mb-4">Upload From Excel</h1>
      <p className="text-white text-xs">
        Please select these options to upload file
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="mb-4">
          <SelectWithSearch
            options={companyOptions}
            label="Company"
            handleChange={(e) => {
              setCompanyId(e.value);
            }}
          />
        </div>
      </div>
      <div>
        <div
          {...getRootProps({
            className:
              "bg-gray-800 text-gray-200 flex flex-1 flex-col items-center px-6 py-32 border-2 rounded border-gray-100 border-dashed outline-none transition duration-500 ease-in-out cursor-pointer",
            style,
          })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' Drop here or click to upload file</p>
        </div>
        <div className="text-center">
          {companyId ? (
            <button
              className="p-3 bg-blue-800 mt-4 text-white rounded shadow-lg hover:bg-blue-900"
              onClick={(e) => convertFile(acceptedFiles)}
            >
              Upload
            </button>
          ) : null}
        </div>
        <div>
          <h4 className="text-white">Files</h4>
          <ul className="text-white">{files}</ul>
        </div>
      </div>
      <ToastContainer delay={7000} position="bottom-right" />
    </div>
  );
}

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
