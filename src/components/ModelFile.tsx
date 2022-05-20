import { SetBoolean } from "../types/react-types";

function ModelFile({
  setShowFile,
  text,
}: {
  setShowFile: SetBoolean;
  text: string;
}) {
  return (
    <div className="model-file-modal">
      Model File
      <button type="button" onClick={() => setShowFile(false)}>
        Close
      </button>{" "}
      <br />
      <div className="model-file">
        {text.split("\n").map((x, i) => (
          <span key={i}>
            {x} <br />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ModelFile;
