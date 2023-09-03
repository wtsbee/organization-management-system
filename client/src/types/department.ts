export type Department = {
  id: number;
  name: string;
  code: string;
  ancestry: string;
  versionId: string;
};

export type DepartmentTree = {
  id: number;
  name: string;
  code: string;
  ancestry: string;
  children: DepartmentTree[];
};
