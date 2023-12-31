import { gql } from "@apollo/client";

export const CREATE_VERSION = gql`
  mutation CreateVersion($input: NewVersion!) {
    createVersion(input: $input) {
      id
      name
      startedAt
    }
  }
`;

export const DELETE_VERSION = gql`
  mutation DeteleVersion($id: ID!) {
    deleteVersion(id: $id)
  }
`;

export const UPDATE_VERSION = gql`
  mutation UpdateVersion($input: UpdateVersion!) {
    updateVersion(input: $input) {
      id
      name
      startedAt
    }
  }
`;
