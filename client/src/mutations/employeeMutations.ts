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

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEployee($input: UpdateEmployee!) {
    updateEmployee(input: $input) {
      id
      firstName
      lastName
      departmentId
    }
  }
`;
