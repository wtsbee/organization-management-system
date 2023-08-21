import { FormatDateToYYYYMMDD } from "@/functions/common.ts";
import { Version } from "@/types/version.ts";

type Props = {
  versions: Version[] | undefined;
};

const VersionTable = ({ versions }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>利用開始日</th>
            <th>バージョン名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {versions?.map((version, index) => (
            <tr key={version.id}>
              <th>{index + 1}</th>
              <td>{FormatDateToYYYYMMDD(version.startedAt)}</td>
              <td>{version.name}</td>
              <td>
                <div className="flex justify-end">
                  <button className="btn btn-outline btn-warning mr-1">
                    編集
                  </button>
                  <button className="btn btn-outline btn-error">削除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VersionTable;
