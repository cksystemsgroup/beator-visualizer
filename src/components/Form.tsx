import { useState } from "react";

function Form(props: { readText: any }) {
  let [unroll, setUnroll] = useState(0);
  let [file, setFile] = useState<File>();
  return (
    <div className="form">
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files!.item(0) || undefined)}
      />{" "}
      <input
        type="number"
        min="0"
        value={unroll}
        onChange={(e) => setUnroll(parseInt(e.target.value))}></input>
      <button disabled={!file} onClick={() => props.readText(file, unroll)}>
        Calculate
      </button>
    </div>
  );
}

export default Form;
