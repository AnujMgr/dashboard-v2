import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const data = JSON.parse(req.body);

  console.log(data);

  try {
    const createStatement = await prisma.financialStatement.create({
      data: {
        name: data.statementName,
      },
    });

    const createStatement2 = await prisma.financialStatementLine.createMany({
      data: data.statements,
    });

    res.status(200).json({ createStatement, createStatement2 });

    // res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
