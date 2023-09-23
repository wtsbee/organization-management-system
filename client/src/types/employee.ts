export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
};

export type EmployeeWithDepartmentInfo = {
  id: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  departmentInfo: string;
};
