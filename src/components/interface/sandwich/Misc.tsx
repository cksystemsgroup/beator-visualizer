import { SetBoolean } from "../../../types/react-types";

function Misc({
  showFile,
  setShowFile,
}: {
  showFile: boolean;
  setShowFile: SetBoolean;
}) {
  return (
    <>
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
      <a
        href="https://github.com/geo-bert/beator-visualizer/blob/master/paper.pdf"
        target="_blank"
        rel="noopener noreferrer">
        Link to paper
      </a>
    </>
  );
}

export default Misc;
