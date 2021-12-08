import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("-----------------------------------");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  try {
    // console.log(finalData);
    const uploadFinancialFacts = await prisma.financialStatementFact.createMany(
      {
        data: data,
        skipDuplicates: true, // Skip 'Bobo'
      }
    );

    res.status(200).json({ uploadFinancialFacts });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }

  res.json(data[0].companyId);

  // if (
  //   !data.hasOwnProperty("companyId") &&
  //   !data.hasOwnProperty("statementId") &&
  //   !data.hasOwnProperty("fiscalYear") &&
  //   !data.hasOwnProperty("quarter") &&
  //   !data.hasOwnProperty("statements")
  // ) {
  //   return res.status(400).json({ message: "Missing Important Data !!" });
  // }

  // const isDuplicate = await prisma.financialStatementFact.findFirst({
  //   where: {
  //     companyId: Number(data.companyId),
  //     fiscalYear: data.fiscalYear,
  //     quarter: data.quarter,
  //   },
  // });

  // if (isDuplicate !== null) {
  //   return res.status(400).json({ message: "Duplicate Data !!" });
  // }

  // var finalData = [];

  // data.statements.map((fact) => {
  //   finalData.push({
  //     companyId: Number(data.companyId),
  //     financialStatementLineId: Number(fact.id),
  //     fiscalYear: Number(data.fiscalYear),
  //     quarter: data.quarter,
  //     amount: Number(fact.amount),
  //   });
  // });
};
