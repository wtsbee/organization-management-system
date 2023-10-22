import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@apollo/client";
import VersionSelectBox from "@/components/version/VersionSelectBox";
import { DepartmentOptions } from "@/functions/department.ts";
import {
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "@/mutations/employeeMutations";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_EMPLOYEE } from "@/queries/employeeQueries";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { DepartmentTree, SelectListType } from "@/types/department";
import { EmployeeWithDepartmentInfo } from "@/types/employee";
import { Version } from "@/types/version";

const EditEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);
  const [selectedDepartmentAncestry, setSelectedDepartmentAncestry] =
    useState("");
  const [selectedVersionId, setSelectedVersionId] = useState<number>();
  const { state } = useLocation();
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const navigate = useNavigate();

  const versionId = state?.versionId;

  const versionIdState = {
    selectedVersionId,
    setSelectedVersionId,
  };

  // URLの動的なバージョンidを取得
  const { id } = useParams();

  // APIから社員データを取得
  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useQuery<{ getEmployee: EmployeeWithDepartmentInfo }>(GET_EMPLOYEE, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  console.log(lastName);
  console.log(employeeData?.getEmployee);

  // APIからバージョン一覧データを取得
  const {
    data: versionData,
    error: versionError,
    loading: versionLoading,
  } = useQuery<{
    getVersions: Version[];
  }>(GET_VERSIONS, {
    fetchPolicy: "no-cache",
  });

  const versions = versionData?.getVersions;

  const currentVersion = versions?.find(
    (version: Version) => version.status == "current"
  );
  useEffect(() => {
    if (
      !employeeLoading &&
      employeeData &&
      !versionLoading &&
      versionData &&
      currentVersion
    ) {
      setLastName(employeeData?.getEmployee.lastName);
      setFirstName(employeeData?.getEmployee.firstName);
      setSelectedDepartmentAncestry(employeeData?.getEmployee.departmentInfo);
      setSelectedVersionId(versionId);
    }
  }, [
    employeeLoading,
    employeeData,
    versionLoading,
    versionData,
    currentVersion,
    versionId,
  ]);

  // APIから部署一覧データを取得
  const { data, error, loading } = useQuery<{
    getDepartmentTree: DepartmentTree[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: versionId ?? null },
    fetchPolicy: "no-cache",
    skip: !selectedVersionId,
  });

  const departments = data?.getDepartmentTree;

  const editFistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const editLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const onUpdate = async () => {
    await updateEmployee({
      variables: {
        input: {
          id,
          firstName,
          lastName,
          departmentId: selectedDepartmentId,
        },
      },
    });
    navigate("/employee");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const ancestryAndDepartmentId = selectedValue.split("/");
    const departmentId =
      ancestryAndDepartmentId[ancestryAndDepartmentId.length - 1];
    setSelectedDepartmentId(parseInt(departmentId));
    setSelectedDepartmentAncestry(e.target.value);
  };

  const handleDeletion = async () => {
    Swal.fire({
      title: "本当に削除しますか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "キャンセル",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteEmployee({
          variables: {
            id,
          },
        });
        navigate("/employee");
      }
    });
  };

  const generateAncestry = (department: SelectListType): string => {
    const ancestry = !department.ancestry
      ? department.id.toString()
      : `${department.ancestry}/${department.id}`;
    return ancestry;
  };

  const notLoadingError: boolean =
    !loading &&
    !error &&
    !versionError &&
    !versionLoading &&
    !employeeLoading &&
    !employeeError;

  return (
    <>
      <h1 className="text-xl font-bold">社員編集</h1>
      {notLoadingError &&
        departments != undefined &&
        versions != undefined &&
        selectedVersionId != undefined && (
          <>
            <div className="mt-5">
              <label>姓</label>
              <br />
              <input
                type="text"
                placeholder="姓を入力してください"
                className="input input-bordered w-full max-w-xs mt-1"
                value={lastName}
                onChange={editLastName}
              />
            </div>
            <div className="mt-5">
              <label>名</label>
              <br />
              <input
                type="text"
                placeholder="名を入力してください"
                className="input input-bordered w-full max-w-xs mt-1"
                value={firstName}
                onChange={editFistName}
              />
            </div>
            <div className="mt-5">
              <label className="label">
                <span>登録するバージョン</span>
              </label>
              <VersionSelectBox
                versions={versions}
                state={versionIdState}
                isDisabled={true}
              />
            </div>
            <div className="form-control w-full max-w-xs mt-5">
              <label className="label">
                <span>この部署の配下に所属</span>
              </label>
              <select
                onChange={handleSelectChange}
                className="select select-bordered font-normal"
                value={selectedDepartmentAncestry}
              >
                <option value="" disabled>
                  部署を選択
                </option>
                {DepartmentOptions(departments).map((department) => (
                  <option
                    key={department.id}
                    value={generateAncestry(department)}
                  >
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <button className="btn btn-primary mr-1" onClick={onUpdate}>
                更新
              </button>
              <button
                className="btn btn-outline  bg-red-300 hover:bg-red-500"
                onClick={handleDeletion}
              >
                削除
              </button>
            </div>
          </>
        )}
    </>
  );
};

export default EditEmployee;
