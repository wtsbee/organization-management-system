import { DepartmentTree as Department } from "@/types/department.ts";

type Props = {
  departments: Department[];
  handeleSelectDepartment: (department: Department) => void;
  selectedDepartmentId: number | undefined;
};

const DepartmentTree = ({
  departments,
  handeleSelectDepartment,
  selectedDepartmentId,
}: Props) => {
  const selectDepartment = (e: React.MouseEvent, department: Department) => {
    e.stopPropagation();
    handeleSelectDepartment(department);
  };

  const checkDepartmentId = (department: Department) => {
    return department.id == selectedDepartmentId;
  };

  const renderDepartment = (department: Department) => (
    <li key={department.id} onClick={(e) => selectDepartment(e, department)}>
      <div
        className={`${
          checkDepartmentId(department)
            ? "bg-base-content text-base-100 hover:bg-base-content hover:text-base-100"
            : "hover:bg-base-200"
        }`}
      >
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
