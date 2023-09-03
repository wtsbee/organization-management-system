import { Link } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import CircleButton from "@/components/common/CircleButton";
import DepartmentTree from "@/components//department/DepartmentTree";
import EmployeeList from "@/components//employee/EmployeeList";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_EMPLOYEES } from "@/queries/employeeQueries";
import { DepartmentTree as Department } from "@/types/department.ts";
import { Employee } from "@/types/employee.ts";
import { useState } from "react";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>();

  // APIから部署ツリーのデータを取得
  const { data, error, loading } = useQuery<{
    getDepartmentTree: Department[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: 1 },
    fetchPolicy: "no-cache",
  });

  const departments = data?.getDepartmentTree;

  const client = useApolloClient();

  const handeleSelectDepartment = async (department: Department) => {
    // APIから部署に所属する社員一覧を取得
    const { data: resData } = await client.query<{
      getEmployees: Employee[];
    }>({
      query: GET_EMPLOYEES,
      variables: { id: department.id },
    });
    setEmployees(resData?.getEmployees);
  };

  return (
    <>
      <h1 className="text-xl font-bold">社員管理</h1>
      {!loading && !error && departments != undefined && (
        <>
          <div className="mt-5 flex gap-3">
            <div className="w-1/3 card bg-neutral-200">
              <div className="menu">
                <DepartmentTree
                  departments={departments}
                  handeleSelectDepartment={handeleSelectDepartment}
                />
              </div>
            </div>
            <div className="w-2/3 card bg-neutral-200 gap-5">
              <EmployeeList employees={employees} />
            </div>
          </div>
        </>
      )}
      <Link to="/employee/new">
        <div className="fixed top-20 right-20">
          <CircleButton />
        </div>
      </Link>
    </>
  );
};

export default EmployeeManagement;
