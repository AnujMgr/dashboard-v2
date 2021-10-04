import prisma from "../../../prisma/client";

export const resolvers = {
  Query: {
    //resolver to get all financial Statements

    getStatementLinesByStatementId: async (parent, args, context) => {
      const statementLines = [];
      const data = await prisma.financialStatementLineSequence.findMany({
        where: {
          financialStatementId: Number(args.id),
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
      return statementLines;
    },
  },
};
