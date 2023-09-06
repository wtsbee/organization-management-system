import { useState } from "react";
import { useQuery } from "@apollo/client";
import DpartmentInputForm from "@/components//department/DpartmentInputForm";
import DepartmentTree from "@/components//department/DepartmentTree";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { DepartmentTree as Department } from "@/types/department.ts";

const DepartmentManagement = () => {
  const [editableFlag, setEditableFlag] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState("");
  const [selectedDepartmentAncestry, setSelectedDepartmentAncestry] =
    useState("");

  const value = {
    selectedDepartmentId,
    selectedDepartmentName,
    selectedDepartmentCode,
    selectedDepartmentAncestry,
    setSelectedDepartmentAncestry,
  };

  // APIからデータを取得
  const { data, error, loading, refetch } = useQuery<{
    getDepartmentTree: Department[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: 1 },
    fetchPolicy: "no-cache",
  });

  const departments = data?.getDepartmentTree;

  const handeleSelectDepartment = (department: Department) => {
    const ancestry = !department.ancestry
      ? department.id.toString()
      : department.ancestry;

    setSelectedDepartmentId(department.id);
    setSelectedDepartmentName(department.name);
    setSelectedDepartmentCode(department.code);
    setSelectedDepartmentAncestry(ancestry);
    setEditableFlag(true);
  };

  return (
    <>
      <h1 className="text-xl font-bold">部署管理</h1>
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
            <div className="w-2/3 px-2 card bg-neutral-200">
              <DpartmentInputForm
                departments={departments}
                value={value}
                refetch={refetch}
                editableFlag={editableFlag}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DepartmentManagement;
