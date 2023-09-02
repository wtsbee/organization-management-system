import { gql } from "@apollo/client";

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: NewDepartment!) {
    createDepartment(input: $input) {
      id
      name
      code
      ancestry
      versionId
    }
  }
`;
