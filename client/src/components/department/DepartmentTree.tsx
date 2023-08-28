import { DepartmentTree as Department } from "@/types/department.ts";

type Props = {
  departments: Department[];
};

const DepartmentTree = ({ departments }: Props) => {
  const renderDepartment = (department: Department) => (
    <li key={department.id}>
      <div className="btext-base-100 hover:bg-neutral hover:text-base-100">
        {department.name}
      </div>
      {department.children.length > 0 && (
        <ul>{department.children.map((child) => renderDepartment(child))}</ul>
      )}
    </li>
  );

  return (
    <ul>{departments.map((department) => renderDepartment(department))}</ul>
  );
};

export default DepartmentTree;