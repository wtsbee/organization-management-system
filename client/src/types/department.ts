export type DepartmentTree = {
  id: number;
  name: string;
  code: string;
  ancestry: string;
  children: DepartmentTree[];
};
