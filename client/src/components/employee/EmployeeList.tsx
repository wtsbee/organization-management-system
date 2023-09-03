import EmployeeCard from "@/components//employee/EmployeeCard";
import { Employee } from "@/types/employee";

type Props = {
  employees: Employee[] | undefined;
};

const EmployeeList = ({ employees }: Props) => {
  return (
    <div className="gap-5 m-5 grid grid-cols-3">
      {employees?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeList;
