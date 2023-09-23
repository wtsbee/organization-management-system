import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import CircleButton from "@/components/common/CircleButton";
import DepartmentTree from "@/components//department/DepartmentTree";
import EmployeeList from "@/components//employee/EmployeeList";
import VersionSelectBox from "@/components/version/VersionSelectBox";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_EMPLOYEES } from "@/queries/employeeQueries";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { DepartmentTree as Department } from "@/types/department.ts";
import { Employee } from "@/types/employee.ts";
import { Version } from "@/types/version";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
  const [selectedVersionId, setSelectedVersionId] = useState<number>();

  const versionIdState = {
    selectedVersionId,
    setSelectedVersionId,
  };

  // APIから部署ツリーのデータを取得
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

  const { data, error, loading } = useQuery<{
    getDepartmentTree: Department[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: versions ? selectedVersionId : null },
    fetchPolicy: "no-cache",
    skip: !selectedVersionId,
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
      fetchPolicy: "no-cache",
    });
    setEmployees(resData?.getEmployees);
    setSelectedDepartmentId(department.id);
  };

  const notLoadingError: boolean =
    !loading && !error && !versionError && !versionLoading;

  return (
    <>
      <h1 className="text-xl font-bold">社員管理</h1>
      {notLoadingError &&
        departments != undefined &&
        versions != undefined &&
        selectedVersionId != undefined && (
          <>
            <div className="mt-5 flex gap-3">
              <div className="w-1/3 card bg-neutral-200">
                <div className="mx-6 mt-5 mb-1">
                  <VersionSelectBox
                    versions={versions}
                    state={versionIdState}
                  />
                </div>
                <div className="menu">
                  <DepartmentTree
                    departments={departments}
                    handeleSelectDepartment={handeleSelectDepartment}
                    selectedDepartmentId={selectedDepartmentId}
                  />
                </div>
              </div>
              <div className="w-2/3 card bg-neutral-200 gap-5">
                <EmployeeList
                  employees={employees}
                  versionId={selectedVersionId}
                />
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
