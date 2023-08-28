export type DepartmentTree = {
  id: number;
  name: string;
  code: string;
  children: DepartmentTree[];
};
