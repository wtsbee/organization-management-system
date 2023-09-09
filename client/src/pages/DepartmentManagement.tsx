import { useState, version } from "react";
import { useQuery } from "@apollo/client";
import DpartmentInputForm from "@/components//department/DpartmentInputForm";
import DepartmentTree from "@/components//department/DepartmentTree";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { DepartmentTree as Department } from "@/types/department.ts";
import { Version } from "@/types/version.ts";

const DepartmentManagement = () => {
  const [editableFlag, setEditableFlag] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState("");
  const [selectedDepartmentAncestry, setSelectedDepartmentAncestry] =
    useState("");
  const [selectedVersionId, setSelectedVersionId] = useState<number>();

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

  const { data: versionData } = useQuery<{ getVersions: Version[] }>(
    GET_VERSIONS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const versions = versionData?.getVersions;

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

  const handleSelectVersionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVersionId(parseInt(e.target.value));
  };

  return (
    <>
      <h1 className="text-xl font-bold">部署管理</h1>
      {!loading && !error && departments != undefined && (
        <>
          <div className="mt-5 flex gap-3">
            <div className="w-1/3 card bg-neutral-200">
              <div className="mx-6 mt-5 mb-1">
                <select
                  onChange={handleSelectVersionChange}
                  className="select select-bordered font-normal"
                  value={selectedVersionId}
                >
                  {versions?.map((version) => (
                    <option key={version.id} value={version.id}>
                      {version.name}
                      {version.status == "current" && "（現在のバージョン）"}
                    </option>
                  ))}
                </select>
              </div>
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
