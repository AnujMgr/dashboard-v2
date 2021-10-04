import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Company {
    id: ID!
    slug: String!
    symbol: String!
    industryId: ID!
  }

  type FinancialStatement {
    id: ID!
    name: String!
    financialStatementLine: [FinancialStatementLine!]!
  }

  type FinancialStatementLine {
    id: ID!
    name: String!
    parentId: Int
    children: [FinancialStatementLine]
  }

  type FinancialStatementFact {
    id: ID!
    financialStatementLineId: Int
    fiscalYear: Int
    quarter: String!
    amount: Float
    statementLine: FinancialStatementLine
  }

  type FinancialStatementWithFacts {
    financialStatement: FinancialStatementLine
    financialStatementFacts: [FinancialStatementFact]
  }

  type Query {
    # get all financial Statements
    getStatementLinesByStatementId(id: ID!): [FinancialStatementLine]
  }
`;
