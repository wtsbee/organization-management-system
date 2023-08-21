import { useState } from "react";
import { useMutation } from "@apollo/client";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { CREATE_VERSION } from "@/mutations/versionMutations";

const NewVersion = () => {
  const [name, setName] = useState("");
  const [createVersion] = useMutation(CREATE_VERSION);
  const [date, setDate] = useState<Date | null>();
  const value = { date, setDate };

  const editVersionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRegister = () => {
    createVersion({
      variables: {
        input: {
          name: name,
          startedAt: date,
        },
      },
    });
  };
  return (
    <>
      <h1 className="text-xl font-bold">バージョン登録画面</h1>
      <div className="mt-5">
        <label>バージョン名</label>
        <br />
        <input
          type="text"
          placeholder="バージョン名を入力してください"
          className="input input-bordered w-full max-w-xs mt-1"
          onChange={editVersionName}
        />
      </div>
      <div className="mt-5">
        <label>利用開始日</label>
        <br />
        <div className="mt-1">
          <DatePickerCustom value={value} />
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-primary " onClick={onRegister}>
          登録
        </button>
      </div>
    </>
  );
};

export default NewVersion;
