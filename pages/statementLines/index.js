import React, { useState } from "react";
import prisma from "./../../prisma/client";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const statements = await prisma.financialStatement.findMany({});
  const statementLines = [];
  if (Object.keys(query).length === 0) {
    return { props: { statements, statementLines } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(query.id),
    },
    include: {
      financialStatementLine: {
        include: {
          children: true,
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  data.map((statement) => {
    statementLines.push({
      id: statement.financialStatementLine.id,
      name: statement.financialStatementLine.name,
      children: statement.financialStatementLine.children,
    });
  });
  // Pass post data to the page via props
  return { props: { statements, statementLines } };
}

export default function StatementLines({ statements, statementLines }) {
  const router = useRouter();
  const [statementId, setStatementId] = useState("0");
  const handleChange = (value, e) => {
    e.preventDefault();
    setStatementId(value);
    router.push({
      pathname: "/statementLines",
      query: { id: statementId },
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          className="p-2"
          value={statementId}
          onChange={(e) => handleChange(e.target.value, e)}
        >
          <option value="0">Select Statement</option>
          {statements.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        <h3 className="text-xs my-1 text-gray-300">Financial Statements</h3>
      </div>

      <table className="table-auto bg-gray-800 rounded-sm w-full text-gray-50">
        <thead>
          <tr className="border-b border-gray-500 h-12 p-2">
            <th className=" text-left px-2">S.N</th>
            <th className="text-left px-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {statementLines.map((statement, index) => (
            <tr key={statement.id} className="border-b border-gray-500 h-10">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{statement.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
