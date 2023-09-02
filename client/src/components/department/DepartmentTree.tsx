import { DepartmentTree as Department } from "@/types/department.ts";

type Props = {
  departments: Department[];
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
};

const DepartmentTree = ({ departments, setSelectedDepartment }: Props) => {
  const selectDepartment = (e: React.MouseEvent, department: Department) => {
    e.stopPropagation();

    const ancestry = !department.ancestry
      ? department.id.toString()
      : `${department.ancestry}/${department.id}`;

    setSelectedDepartment(ancestry);
  };

  const renderDepartment = (department: Department) => (
    <li key={department.id} onClick={(e) => selectDepartment(e, department)}>
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
