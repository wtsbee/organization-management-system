import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: NewEmployee!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      departmentId
    }
  }
`;
