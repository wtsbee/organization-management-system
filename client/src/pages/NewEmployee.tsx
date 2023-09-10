import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DepartmentOptions } from "@/functions/department.ts";
import { CREATE_EMPLOYEE } from "@/mutations/employeeMutations";
import { GET_DEPARTMENT_TREE } from "@/queries/departmentQueries";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { DepartmentTree, SelectListType } from "@/types/department";
import { Version } from "@/types/version";

const NewEmployee = () => {
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);
  const [selectedDepartmentAncestry, setSelectedDepartmentAncestry] =
    useState("");
  const [selectedVersionId, setSelectedVersionId] = useState<number>();

  const navigate = useNavigate();

  // APIから部署一覧データを取得
  const { data: versionData, loading: versionLoading } = useQuery<{
    getVersions: Version[];
  }>(GET_VERSIONS, {
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
    getDepartmentTree: DepartmentTree[];
  }>(GET_DEPARTMENT_TREE, {
    variables: { id: versions ? selectedVersionId : null },
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

  const handleRegister = async () => {
    if (selectedDepartmentId !== 0) {
      await createEmployee({
        variables: {
          input: {
            firstName,
            lastName,
            departmentId: selectedDepartmentId,
          },
        },
      });
      navigate("/employee");
    } else {
      alert("部署を選択してください");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const ancestryAndDepartmentId = selectedValue.split("/");
    const departmentId =
      ancestryAndDepartmentId[ancestryAndDepartmentId.length - 1];
    setSelectedDepartmentId(parseInt(departmentId));
    setSelectedDepartmentAncestry(e.target.value);
  };

  const generateAncestry = (department: SelectListType): string => {
    const ancestry = !department.ancestry
      ? department.id.toString()
      : `${department.ancestry}/${department.id}`;
    return ancestry;
  };

  return (
    <>
      <h1 className="text-xl font-bold">社員登録</h1>
      {!loading && !error && departments != undefined && (
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
            <button
              className="btn btn-outline bg-blue-300 hover:bg-blue-500"
              onClick={handleRegister}
            >
              登録
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default NewEmployee;
