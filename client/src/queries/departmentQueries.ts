import { gql } from "@apollo/client";

export const GET_DEPARTMENT_TREE = gql`
  fragment DepartmentPart on DepartmentTree {
    id
    name
    code
  }

  query GetDepartmentTree($id: ID!) {
    getDepartmentTree(id: $id) {
      ...DepartmentPart
      children {
        ...DepartmentPart
        children {
          ...DepartmentPart
          children {
            ...DepartmentPart
            children {
              ...DepartmentPart
            }
          }
        }
      }
    }
  }
`;
