import { gql } from "@apollo/client";

export const GET_STATEMENT_LINES_BY_STATEMENT_ID = gql`
  query getStatementLinesByStatementId($statementId: ID!) {
    getStatementLinesByStatementId(id: $statementId) {
      id
      name
      parentId
    }
  }
`;
