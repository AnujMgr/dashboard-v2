import React, { useState } from "react";
import prisma from "../../prisma/client";

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
