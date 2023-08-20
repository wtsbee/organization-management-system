import { gql } from "@apollo/client";

export const CREATE_VERSION = gql`
  mutation CreateVersion($input: NewVersion!) {
    createVersion(input: $input) {
      id
      name
    }
  }
`;
