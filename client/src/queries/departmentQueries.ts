import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query GetDepartments($id: ID!) {
    getDepartments(id: $id) {
      id
      name
      code
      ancestry
      versionId
    }
  }
`;

export const GET_DEPARTMENT_TREE = gql`
  fragment DepartmentPart on DepartmentTree {
    id
    name
    code
    ancestry
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
              children {
                ...DepartmentPart
                children {
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
            }
          }
        }
      }
    }
  }
`;
