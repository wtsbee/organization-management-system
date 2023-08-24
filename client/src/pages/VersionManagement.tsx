import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import VersionTable from "@/components/version/VersionTable";
import { GET_VERSIONS } from "@/queries/versionQueries";
import { Version } from "@/types/version.ts";

const VersionManagement = () => {
  const { data, refetch } = useQuery<{ getVersions: Version[] }>(GET_VERSIONS, {
    fetchPolicy: "no-cache",
  });
  const versions = data?.getVersions;
  return (
    <>
      <h1 className="text-xl font-bold">バージョン管理</h1>

      <div className="mt-5">
        <VersionTable versions={versions} refetch={refetch} />
      </div>
      <Link to="/version/new" className="">
        <div className="fixed top-28 right-20">
          <button className="btn btn-circle btn-outline btn-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </Link>
    </>
  );
};

export default VersionManagement;
