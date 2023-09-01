import { gql } from "@apollo/client";

export const GET_VERSION = gql`
  query GetVersion($id: ID!) {
    getVersion(id: $id) {
      id
      name
      startedAt
    }
  }
`;

export const GET_VERSIONS = gql`
  query GetVersions {
    getVersions {
      id
      name
      startedAt
      status
    }
  }
`;
