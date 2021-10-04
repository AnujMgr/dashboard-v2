import React, { useState } from "react";
import DragableTable from "../../components/DragableTable/DragableTable";
import prisma from "../../prisma/client";
import Toast from "../../components/Toast/Toast";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const statements = await prisma.financialStatement.findMany({});

  const lines = [];
  if (Object.keys(query).length === 0) {
    return { props: { statements, lines } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(query.id),
      financialStatementLine: {
        parentId: null,
      },
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
    lines.push({
      id: statement.financialStatementLine.id,
      name: statement.financialStatementLine.name,
      children: statement.financialStatementLine.children,
    });
  });
  // Pass post data to the page via props
  return { props: { statements, lines } };
}

export default function Manage({ statements, lines }) {
  const router = useRouter();
  const { id } = router.query;

  const [statementId, setStatementId] = useState(id === undefined ? 0 : id); // current Statement Id
  const [statementLineSequence, setStatementLineSequence] = useState([]); //Sequence lines data, Used for Submitting data
  const [isSubmitting, setSubmitting] = useState(false);
  const [draggedData, setDraggedData] = useState([]);

  const handleChange = (data) => {
    var parentChild = [];
    var myData2 = [];
    data.map((item, index) => {
      parentChild.push({ id: item.id, parent: null });
      item.children.length > 0
        ? (myData2.push({
            financialStatementId: Number(statementId),
            financialStatementLineId: Number(item.id),
            sequence: Number(index + 1),
          }),
          item.children.map((d, ind) => {
            myData2.push({
              financialStatementId: Number(statementId),
              financialStatementLineId: Number(d.id),
              sequence: Number(index + 1 + "." + (ind + 1)),
            });
            parentChild.push({ id: d.id, parent: item.id });
          }))
        : myData2.push({
            financialStatementId: Number(statementId),
            financialStatementLineId: Number(item.id),
            sequence: Number(index + 1),
          });
    });
    setStatementLineSequence(myData2);
    setDraggedData(parentChild);
  };

  // console.log(draggedData);
  // console.log(statementLineSequence);
  console.log(draggedData);

  const handleSubmit = async (statementLines, event) => {
    event.preventDefault();
    setSubmitting(true);
    const url = "/api/financialStatements/statementLinesSequence";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statementLines, draggedData }),
    };

    return await fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log(response.ok);
          setSubmitting(false);
          return <Toast message="Statement updated Sucessfully" />;
        }
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
        setSubmitting(false);
      });
  };

  const handleSelect = (value, e) => {
    e.preventDefault();
    setStatementId(value);
    router.push({
      pathname: "/statementLines/manage",
      query: { id: value },
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          className="p-2"
          value={statementId}
          onChange={(e) => handleSelect(e.target.value, e)}
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

      <DragableTable
        handleChange={handleChange}
        statementId={statementId}
        dataItems={lines}
      />

      {statementId !== 0 && statementLineSequence.length !== 0 ? (
        <div className="mt-4">
          <button
            type="submit"
            className={`${
              !isSubmitting
                ? "bg-blue-700"
                : "bg-gray-200 text-black cursor-not-allowed"
            } px-3 py-1 rounded`}
            disabled={isSubmitting}
            onClick={(e) => handleSubmit(statementLineSequence, e)}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
