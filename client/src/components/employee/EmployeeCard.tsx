import { Employee } from "@/types/employee";
import { useNavigate } from "react-router-dom";

type Props = {
  employee: Employee;
  versionId: number;
};

const EmployeeCard = ({ employee, versionId }: Props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/employee/${employee.id}`, { state: { versionId } });
  };

  return (
    <div
      className="card bg-base-100 shadow-xl cursor-pointer"
      onClick={handleEdit}
    >
      <figure className="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </figure>
      <div className="card-body items-center ">
        <span className="card-title">
          {employee.lastName} {employee.firstName}
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard;
