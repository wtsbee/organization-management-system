import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DepartmentTree as Department } from "@/types/department.ts";
import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "@/mutations/departmentMutations";

type Props = {
  departments: Department[];
  value: {
    selectedDepartmentId: number | undefined;
    selectedDepartmentName: string;
    selectedDepartmentCode: string;
    selectedDepartmentAncestry: string;
    setSelectedDepartmentAncestry: React.Dispatch<React.SetStateAction<string>>;
  };
  refetch: () => void;
  editableFlag: boolean;
};

const DpartmentInputForm = ({
  departments,
  value,
  refetch,
  editableFlag,
}: Props) => {
  const [createDepartment] = useMutation(CREATE_DEPARTMENT);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);
  const {
    selectedDepartmentId,
    selectedDepartmentName,
    selectedDepartmentCode,
    selectedDepartmentAncestry,
    setSelectedDepartmentAncestry,
  } = {
    ...value,
  };
  const [name, setName] = useState(selectedDepartmentName);
  const [code, setCode] = useState(selectedDepartmentCode);

  const editDepartmentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const editDepartmentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const resetInputForm = () => {
    setName("");
    setCode("");
    setSelectedDepartmentAncestry("");
  };

  const handleRegisteration = async () => {
    if (selectedDepartmentAncestry !== "") {
      await createDepartment({
        variables: {
          input: {
            name,
            code,
            ancestry: selectedDepartmentAncestry,
            versionId: 1,
          },
        },
      });
      resetInputForm();
      refetch();
    }
  };

  const handleUpdate = async () => {
    if (selectedDepartmentAncestry !== "") {
      await updateDepartment({
        variables: {
          input: {
            id: selectedDepartmentId,
            name,
            code,
            ancestry: selectedDepartmentAncestry,
          },
        },
      });
      resetInputForm();
      refetch();
    }
  };

  const handleDeletion = () => {
    // TODO：部署削除APIを呼び出す
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartmentAncestry(e.target.value);
  };

  const generateAncestry = (department: Department): string => {
    const ancestry = !department.ancestry
      ? department.id.toString()
      : `${department.ancestry}/${department.id}`;
    return ancestry;
  };

  const renderSelectOption = (department: Department): JSX.Element => (
    <>
      <option
        key={department.id}
        value={generateAncestry(department)}
        selected={generateAncestry(department) == selectedDepartmentAncestry}
      >
        {department.name}
      </option>
      {department.children.length > 0 && (
        <>{department.children.map((child) => renderSelectOption(child))}</>
      )}
    </>
  );

  useEffect(() => {
    setName(selectedDepartmentName);
    setCode(selectedDepartmentCode);
  }, [selectedDepartmentName, selectedDepartmentCode]);

  return (
    <>
      <div className="mt-5">
        <label className="label">
          <span>部署名</span>
        </label>
        <input
          type="text"
          placeholder="部署名を入力してください"
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={editDepartmentName}
        />
      </div>
      <div className="mt-5">
        <label className="label">
          <span>部署コード</span>
        </label>
        <input
          type="text"
          placeholder="部署コードを入力してください"
          className="input input-bordered w-full max-w-xs"
          value={code}
          onChange={editDepartmentCode}
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
          <option value="" disabled selected>
            部署を選択
          </option>
          {departments.map((department) => renderSelectOption(department))}
        </select>
      </div>
      <div className="my-5">
        {editableFlag ? (
          <>
            <button
              onClick={handleUpdate}
              className="btn btn-outline bg-yellow-300 hover:bg-yellow-500 mr-1"
            >
              編集
            </button>
            <button
              onClick={handleDeletion}
              className="btn btn-outline bg-red-300 hover:bg-red-500"
            >
              削除
            </button>
          </>
        ) : (
          <button
            onClick={handleRegisteration}
            className="btn btn-outline bg-blue-300 hover:bg-blue-500"
          >
            登録
          </button>
        )}
      </div>
    </>
  );
};

export default DpartmentInputForm;
