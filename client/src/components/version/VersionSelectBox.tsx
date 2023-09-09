import { Version } from "@/types/version";

type props = {
  versions: Version[];
  state: {
    selectedVersionId: number | undefined;
    setSelectedVersionId: React.Dispatch<
      React.SetStateAction<number | undefined>
    >;
  };
};

const VersionSelectBox = ({ versions, state }: props) => {
  const { selectedVersionId, setSelectedVersionId } = { ...state };
  const handleSelectVersionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVersionId(parseInt(e.target.value));
  };

  return (
    <select
      onChange={handleSelectVersionChange}
      className="select select-bordered font-normal"
      value={selectedVersionId}
    >
      {versions?.map((version) => (
        <option key={version.id} value={version.id}>
          {version.name}
          {version.status == "current" && "（現在のバージョン）"}
        </option>
      ))}
    </select>
  );
};

export default VersionSelectBox;
