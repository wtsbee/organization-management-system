import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE } from "@/mutations/employeeMutations";

const NewEmployee = () => {
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const editFistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const editLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleRegister = async () => {
    await createEmployee({
      variables: {
        input: {
          firstName,
          lastName,
          departmentId: 4,
        },
      },
    });
    navigate("/employee");
  };

  return (
    <>
      <h1 className="text-xl font-bold">社員登録</h1>
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
      <div className="mt-5">
        <button
          className="btn btn-outline bg-blue-300 hover:bg-blue-500"
          onClick={handleRegister}
        >
          登録
        </button>
      </div>
    </>
  );
};

export default NewEmployee;
