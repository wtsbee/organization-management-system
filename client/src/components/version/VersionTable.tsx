import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { FormatDateToYYYYMMDD } from "@/functions/common.ts";
import { Version } from "@/types/version.ts";
import { DELETE_VERSION } from "@/mutations/versionMutations";

type Props = {
  versions: Version[] | undefined;
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<
    ApolloQueryResult<{
      getVersions: Version[];
    }>
  >;
};

const VersionTable = ({ versions, refetch }: Props) => {
  const navigate = useNavigate();

  const [deleteVersion] = useMutation(DELETE_VERSION);

  const onDelete = (id: number) => {
    Swal.fire({
      title: "本当に削除しますか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "キャンセル",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteVersion({
          variables: {
            id,
          },
        });
        navigate("/");
        refetch();
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="w-1/4"></th>
            <th className="w-1/4">利用開始日</th>
            <th className="w-1/4">バージョン名</th>
            <th className="w-1/4"></th>
          </tr>
        </thead>
        <tbody>
          {versions?.map((version, index) => (
            <tr key={version.id}>
              <th>{index + 1}</th>
              <td>{FormatDateToYYYYMMDD(version.startedAt)}</td>
              {version.status == "current" ? (
                <td>
                  {version.name}
                  <span className="font-bold ml-5">★★現在のバージョン★★</span>
                </td>
              ) : (
                <td>{version.name}</td>
              )}
              <td>
                <div className="flex justify-end">
                  <Link to={`/version/${version.id}`} className="">
                    <button className="btn btn-outline bg-yellow-300 hover:bg-yellow-500 mr-1">
                      編集
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline bg-red-300 hover:bg-red-500"
                    onClick={() => onDelete(version.id)}
                  >
                    削除
                  </button>
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
