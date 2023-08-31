import { DepartmentTree as Department } from "@/types/department.ts";

type Props = {
  departments: Department[];
};

const DpartmentInputForm = ({ departments }: Props) => {
  const renderSelectOption = (department: Department): JSX.Element => (
    <>
      <option key={department.id}>{department.name}</option>
      {department.children.length > 0 && (
        <>{department.children.map((child) => renderSelectOption(child))}</>
      )}
    </>
  );

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
        <select className="select select-bordered font-normal">
          <option value="" disabled selected>
            部署を選択
          </option>
          {departments.map((department) => renderSelectOption(department))}
        </select>
      </div>
    </>
  );
};

export default DpartmentInputForm;
