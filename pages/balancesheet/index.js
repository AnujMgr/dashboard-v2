import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import { GET_STATEMENT_LINES_BY_STATEMENT_ID } from "../api/queries";
import prisma from "../../prisma/client";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const statements = await prisma.financialStatement.findMany({});

  // Pass post data to the page via props
  return { props: { statements } };
}

export default function StatementLines({ statements, statementLines }) {
  const [statementId, setStatementId] = useState("0");

  return (
    <div className="p-4">
      <h1>Sdf</h1>
    </div>
  );
}
