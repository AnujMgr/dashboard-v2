import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import { GET_STATEMENT_LINES_BY_STATEMENT_ID } from "../api/queries";
import prisma from "./../../prisma/client";

export async function getServerSideProps({}) {
  const statements = await prisma.financialStatement.findMany({});
  // Pass post data to the page via props
  return { props: { statements } };
}

export default function Statements({ statements, statementLines }) {
  const [statementId, setStatementId] = useState("0");
  const { loading, error, data } = useQuery(
    GET_STATEMENT_LINES_BY_STATEMENT_ID,
    {
      variables: {
        statementId: Number(statementId),
      },
    }
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return <h1>Error...</h1>;
  }
  console.log(statements);

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          className="p-2"
          value={statementId}
          onChange={(e) => setStatementId(e.target.value)}
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
          {data.getStatementLinesByStatementId.map((statement) => (
            <tr key={statement.id} className="border-b border-gray-500 h-10">
              <td className="p-2">{statement.sequence}</td>
              <td className="p-2">{statement.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
