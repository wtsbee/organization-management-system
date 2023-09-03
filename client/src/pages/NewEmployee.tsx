import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EMPLOYEE } from "@/mutations/employeeMutations";
import { GET_DEPARTMENTS } from "@/queries/departmentQueries";
import { Department } from "@/types/department.ts";

const NewEmployee = () => {
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);

  const navigate = useNavigate();

  // APIから部署一覧データを取得
  const { data, error, loading } = useQuery<{
    getDepartments: Department[];
  }>(GET_DEPARTMENTS, {
    variables: { id: 1 },
    fetchPolicy: "no-cache",
  });

  const departments = data?.getDepartments;

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
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartmentId(Number(e.target.value));
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
              placeholder="バージョン名を入力してください"
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
              placeholder="バージョン名を入力してください"
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
            >
              <option value="0" disabled selected>
                部署を選択
              </option>
              {departments.map((department) => (
                <option value={department.id} key={department.id}>
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
