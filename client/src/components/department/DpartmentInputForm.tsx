// import { useState } from "react";
import { DepartmentTree as Department } from "@/types/department.ts";

type Props = {
  departments: Department[];
  value: {
    selectedDepartment: string;
    setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  };
};

const DpartmentInputForm = ({ departments, value }: Props) => {
  const { selectedDepartment, setSelectedDepartment } = { ...value };

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
        selected={generateAncestry(department) == selectedDepartment}
      >
        {department.name}
      </option>
      {department.children.length > 0 && (
        <>{department.children.map((child) => renderSelectOption(child))}</>
      )}
    </>
  );

  const handleRegisteration = () => {
    console.log(selectedDepartment);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedDepartment(e.target.value);
  };

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
        <button onClick={handleRegisteration} className="btn btn-primary">
          登録
        </button>
      </div>
    </>
  );
};

export default DpartmentInputForm;
