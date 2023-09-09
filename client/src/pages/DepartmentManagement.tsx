import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DpartmentInputForm from "@/components/department/DpartmentInputForm";
import DepartmentTree from "@/components/department/DepartmentTree";
import VersionSelectBox from "@/components/version/VersionSelectBox";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { DepartmentTree as Department } from "@/types/department";
import { Version } from "@/types/version";

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

  const versionIdState = {
    selectedVersionId,
    setSelectedVersionId,
  };

  // APIからデータを取得
  const {
    data: versionData,
    error: versionError,
    loading: versionLoading,
  } = useQuery<{ getVersions: Version[] }>(GET_VERSIONS, {
    fetchPolicy: "no-cache",
  });

  const versions = versionData?.getVersions;

  const currentVersion = versions?.find(
    (version: Version) => version.status == "current"
  );

  useEffect(() => {
    if (!versionLoading && versionData && currentVersion) {
      setSelectedVersionId(currentVersion.id);
    }
  }, [versionLoading, versionData, currentVersion]);

  const { data, error, loading, refetch } = useQuery<{
    getDepartmentTree: Department[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: versions ? selectedVersionId : null },
    fetchPolicy: "no-cache",
    skip: !selectedVersionId,
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

  const notLoadingError: boolean =
    !loading && !error && !versionError && !versionLoading;

  return (
    <>
      <h1 className="text-xl font-bold">部署管理</h1>
      {notLoadingError && departments != undefined && versions != undefined && (
        <>
          <div className="mt-5 flex gap-3">
            <div className="w-1/3 card bg-neutral-200">
              <div className="mx-6 mt-5 mb-1">
                <VersionSelectBox versions={versions} state={versionIdState} />
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
