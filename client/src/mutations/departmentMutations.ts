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

export const DELETE_DEPARTMENT = gql`
  mutation DeteleDepartment($id: ID!) {
    deleteDepartment(id: $id)
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartment!) {
    updateDepartment(input: $input) {
      id
      name
      code
      ancestry
      versionId
    }
  }
`;
