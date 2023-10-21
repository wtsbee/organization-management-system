import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DepartmentOptions } from "@/functions/department.ts";
import {
  DepartmentTree as Department,
  SelectListType,
} from "@/types/department.ts";
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
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
  versionId: number;
};

const DpartmentInputForm = ({
  departments,
  value,
  refetch,
  editableFlag,
  versionId,
}: Props) => {
  const [createDepartment] = useMutation(CREATE_DEPARTMENT);
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);
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
    await createDepartment({
      variables: {
        input: {
          name,
          code,
          ancestry: selectedDepartmentAncestry,
          versionId: versionId,
        },
      },
    });
    resetInputForm();
    refetch();
  };

  const handleUpdate = async () => {
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
        await deleteDepartment({
          variables: {
            id: selectedDepartmentId,
          },
        });
        resetInputForm();
        refetch();
      }
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartmentAncestry(e.target.value);
  };

  const generateAncestry = (department: SelectListType): string => {
    const ancestry = !department.ancestry
      ? department.id.toString()
      : `${department.ancestry}/${department.id}`;
    return ancestry;
  };

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
          value={selectedDepartmentAncestry}
        >
          <option value="" disabled>
            部署を選択
          </option>
          {DepartmentOptions(departments).map((department) => (
            <option key={department.id} value={generateAncestry(department)}>
              {department.name}
            </option>
          ))}
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
