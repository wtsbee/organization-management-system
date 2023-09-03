import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees($id: ID!) {
    getEmployees(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
