import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { GET_VERSION } from "@/queries/versionQueries";
import { Version } from "@/types/version.ts";

const EditVersion = () => {
  // URLの動的なバージョンidを取得
  const { id } = useParams();

  // APIからデータを取得
  const { data, loading, error } = useQuery<{ getVersion: Version }>(
    GET_VERSION,
    {
      variables: { id },
      fetchPolicy: "no-cache",
    }
  );

  const version = data?.getVersion;

  const initialName = version?.name || ""; // undefinedの場合は空文字をセット
  const [name, setName] = useState<string>(initialName);

  const initialDate = version?.startedAt ? new Date(version?.startedAt) : null;
  const [date, setDate] = useState<Date | null>(initialDate);

  // propsで渡す変数
  const value = { date, setDate };

  const editVersionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    // データが取得された後に値を設定
    if (version?.name !== undefined) {
      setName(version?.name);
    }
    if (version?.startedAt !== undefined) {
      setDate(new Date(version?.startedAt));
    }
  }, [version]);

  return (
    <>
      <h1 className="text-xl font-bold">バージョン編集</h1>
      {!loading && !error && (
        <>
          <div className="mt-5">
            <label>バージョン名</label>
            <br />
            <input
              type="text"
              placeholder="バージョン名を入力してください"
              className="input input-bordered w-full max-w-xs mt-1"
              value={name}
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
            <button className="btn btn-primary ">更新</button>
          </div>
        </>
      )}
    </>
  );
};

export default EditVersion;
