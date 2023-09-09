import { DepartmentTree, SelectListType } from "@/types/department.ts";

export const DepartmentOptions = (
  departments: DepartmentTree[]
): SelectListType[] => {
  let options: SelectListType[] = [];
  for (const department of departments) {
    const path = department.name;
    options.push({
      id: department.id,
      name: path,
      ancestry: department.ancestry,
    });
    // 配下の部署も整形する
    if (department.children.length != 0) {
      options = subDepartmentOptions(department.children, path, options);
    }
  }

  return options;
};

const subDepartmentOptions = (
  departments: DepartmentTree[],
  path: string,
  options: SelectListType[]
): SelectListType[] => {
  for (const department of departments) {
    const newPath = `${path}/${department.name}`;
    options.push({
      id: department.id,
      name: newPath,
      ancestry: department.ancestry,
    });
    if (department.children.length != 0) {
      options = subDepartmentOptions(department.children, newPath, options);
    }
  }
  return options;
};
