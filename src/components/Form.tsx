import { useState } from "react";

function Form(props: { readText: any }) {
  let [file, setFile] = useState<File>();
  return (
    <form>
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files!.item(0) || undefined)}
      />{" "}
      <button
        type="button"
        disabled={!file}
        onClick={() => props.readText(file)}
      >
        Calculate
      </button>
    </form>
  );
}

export default Form;
