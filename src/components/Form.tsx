import { useState } from "react";

function Form({
  setText,
}: {
  setText: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  let [file, setFile] = useState<File>();
  return (
    <form>
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files!.item(0)!)}
      />{" "}
      <button
        type="button"
        disabled={!file}
        onClick={() => file!.text().then(setText)}
      >
        Calculate
      </button>
    </form>
  );
}

export default Form;
