import { gql } from "@apollo/client";

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      firstName
      lastName
      departmentId
      departmentInfo
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees($id: ID!) {
    getEmployees(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
