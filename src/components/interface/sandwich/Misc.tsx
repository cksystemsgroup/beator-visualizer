import { SetBoolean } from "../../../types/react-types";

function Misc({
  showFile,
  setShowFile,
}: {
  showFile: boolean;
  setShowFile: SetBoolean;
}) {
  return (
    <div>
      <input
        type="button"
        disabled={showFile}
        onClick={() => {
          setShowFile(true);
        }}
        value="Show Model File"
      />
    </div>
  );
}

export default Misc;
