import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CircleButton from "@/components/common/CircleButton";
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
          <CircleButton />
        </div>
      </Link>
    </>
  );
};

export default VersionManagement;
