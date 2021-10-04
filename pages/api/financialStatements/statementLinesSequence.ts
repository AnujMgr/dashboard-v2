import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const data = req.body;

  console.log(data.statementLines);

  try {
    const deleteStatement =
      await prisma.financialStatementLineSequence.deleteMany({
        where: {
          financialStatementId: Number(
            data.statementLines[0].financialStatementId
          ),
        },
      });

    const createStatement =
      await prisma.financialStatementLineSequence.createMany({
        data: data.statementLines,
      });

    const updateData = data.draggedData.map(
      async (line) =>
        await prisma.financialStatementLine.update({
          where: {
            id: Number(line.id),
          },
          data: {
            parentId: JSON.parse(line.parent),
          },
        })
    );

    const updateStatements = res
      .status(200)
      .json({ deleteStatement, createStatement, updateData });

    // res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
