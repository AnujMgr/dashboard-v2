import { useRouter } from "next/router";
import React, { useState } from "react";
import prisma from "./../../prisma/client";
import SelectWithSearch from "../../components/SelectWithSearch/SelectWithSearch";

export async function getServerSideProps({ query }) {
  const statements = await prisma.financialStatement.findMany({});
  const companies = await prisma.company.findMany({});
  const statementWithFacts = [];

  if (Object.keys(query).length === 0) {
    return { props: { companies, statements, statementWithFacts } };
  }

  const aggregations = await prisma.financialStatementLineSequence.aggregate({
    where: {
      financialStatementId: Number(query.statementId),
      financialStatementLine: {
        parentId: null,
      },
    },
    include: {
      financialStatementLine: {
        include: {
          children: {
            include: {
              financialStatementFact: {
                where: {
                  companyId: Number(query.companyId),
                  fiscalYear: query.fiscalYear,
                  quarter: query.quarter,
                },
              },
            },
          },
          financialStatementFact: {
            where: {
              companyId: Number(query.companyId),
              fiscalYear: query.fiscalYear,
              quarter: query.quarter,
            },
          },
        },
      },
    },
    _avg: {
      amount: true,
    },
  });

  console.log(aggregations);

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(query.statementId),
      financialStatementLine: {
        parentId: null,
      },
    },
    include: {
      financialStatementLine: {
        include: {
          children: {
            include: {
              financialStatementFact: {
                where: {
                  companyId: Number(query.companyId),
                  fiscalYear: query.fiscalYear,
                  quarter: query.quarter,
                },
              },
            },
          },
          financialStatementFact: {
            where: {
              companyId: Number(query.companyId),
              fiscalYear: query.fiscalYear,
              quarter: query.quarter,
            },
          },
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  data.map((fact) => {
    statementWithFacts.push({
      id: fact.financialStatementLine.id,
      name: fact.financialStatementLine.name,
      children: fact.financialStatementLine.children.map((data) => ({
        id: data.id,
        name: data.name,
        financialStatementFact: data.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
        })),
      })),
      financialStatementFact:
        fact.financialStatementLine.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
        })),
    });
  });

  return { props: { statements, companies, statementWithFacts } };
}

export default function Statements({
  statements,
  companies,
  statementWithFacts,
}) {
  const router = useRouter();
  const [companyId, setCompanyId] = useState("0");
  const [statementId, setStatementId] = useState("0");
  const [quarter, setQuarter] = useState("0");
  const [fiscalYear, setFiscalYear] = useState("0");

  const statementOptions = [];
  const companiesOptions = [];
  const quarterOptions = [
    { value: "Q1", label: "Q1" },
    { value: "Q2", label: "Q2" },
    { value: "Q3", label: "Q3" },
    { value: "Q4", label: "Q4" },
  ];
  const fiscalYearOptions = [
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
  ];

  statements.map((line) =>
    statementOptions.push({ value: line.id, label: line.name })
  );

  companies.map((company) =>
    companiesOptions.push({ value: company.id, label: company.name })
  );

  console.log(statementWithFacts);

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="mb-4">
          <SelectWithSearch
            options={statementOptions}
            label="Statement"
            handleChange={(e) => {
              setStatementId(e.value);
              router.push({
                pathname: "/financial-statements",
                query: {
                  statementId: e.value,
                  companyId: companyId,
                  fiscalYear: fiscalYear,
                  quarter: quarter,
                },
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectWithSearch
            options={companiesOptions}
            label="Company"
            handleChange={(e) => {
              setCompanyId(e.value);
              router.push({
                pathname: "/financial-statements",
                query: {
                  statementId: statementId,
                  companyId: e.value,
                  fiscalYear: fiscalYear,
                  quarter: quarter,
                },
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectWithSearch
            options={fiscalYearOptions}
            label="Fiscal Year"
            handleChange={(e) => {
              setFiscalYear(e.value);
              router.push({
                pathname: "/financial-statements",
                query: {
                  statementId: statementId,
                  companyId: companyId,
                  fiscalYear: e.value,
                  quarter: quarter,
                },
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectWithSearch
            options={quarterOptions}
            label="Quarter"
            handleChange={(e) => {
              setQuarter(e.value);
              router.push({
                pathname: "/financial-statements",
                query: {
                  statementId: statementId,
                  companyId: companyId,
                  fiscalYear: fiscalYear,
                  quarter: e.value,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="border-b border-gray-600 overflow-x-auto scrollable">
        <div className="grid grid-cols-5">
          <div className="col-span-3 p-2 bg-gray-700 mb-1">
            <h1 className="text-white">Statments</h1>
          </div>
          <div className="col-span-2 p-2 bg-gray-700 mb-1">
            <h1 className="text-white">Amount</h1>
          </div>
        </div>

        {statementWithFacts.map((fact) => (
          <div key={fact.id} className="grid grid-cols-5">
            <div className="col-span-3 bg-gray-800 p-2 mb-1">
              <h1>{fact.name}</h1>
            </div>
            {fact.financialStatementFact.length > 0 ? (
              <div className="col-span-2 bg-gray-800 p-2 mb-1">1</div>
            ) : (
              <div className="col-span-2 bg-gray-800 p-2 mb-1">0</div>
            )}

            {fact.children.length > 0 ? (
              <>
                <div className="col-span-3 ml-3 bg-gray-800 p-2 mb-1">
                  {fact.children.map((data) => {
                    return <h1 key={data.id}>{data.name}</h1>;
                  })}
                </div>
                {fact.financialStatementFact.length > 0 ? (
                  <div className="col-span-2 bg-gray-800 p-2 mb-1">1</div>
                ) : (
                  <div className="col-span-2 bg-gray-800 p-2 mb-1">0</div>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>
      {/* <div className="">
        <h1>SDFsdfsdaf</h1>
      </div> */}

      {/* <table className="table-auto rounded-sm w-full text-gray-50">
        <thead>
          <tr className="border-b border-gray-500 h-12 p-2 bg-gray-800 ">
            <th className=" text-left px-2">S.N</th>
            <th className="text-left px-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {statementWithFacts.map((fact) => (
            <tr key={fact.id} className="border-b border-gray-500 h-10">
              <td className="p-2">{fact.name}</td>
              <td className="p-2">"Sdf"</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
