import { useQuery } from "@apollo/client";
import DpartmentInputForm from "@/components//department/DpartmentInputForm";
import DepartmentTree from "@/components//department/DepartmentTree";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { DepartmentTree as Department } from "@/types/department.ts";

const DepartmentManagement = () => {
  // APIからデータを取得
  const { data, error, loading } = useQuery<{
    getDepartmentTree: Department[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: 1 },
    fetchPolicy: "no-cache",
  });

  const departments = data?.getDepartmentTree;

  return (
    <>
      <h1 className="text-xl font-bold">部署管理</h1>
      {!loading && !error && departments != undefined && (
        <>
          <div className="mt-5 flex gap-3">
            <div className="card bg-neutral-200 w-1/2">
              <div className="menu">
                <DepartmentTree departments={departments} />
              </div>
            </div>
            <div className="w-1/2">
              <DpartmentInputForm />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DepartmentManagement;
