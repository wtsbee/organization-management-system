import { gql } from "@apollo/client";

export const GET_VERSIONS = gql`
  query GetVersions {
    getVersions {
      id
      name
      startedAt
    }
  }
`;
